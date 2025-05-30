from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from postcode import AllPostCodes
from service_provider import AllServiceProviders
from approaches import GraphBasedApproach
import bisect
from tqdm import tqdm
import time
import os
import traceback

from dotenv import load_dotenv
load_dotenv(dotenv_path='.env')

PORT = os.getenv('PORT')
app = Flask(__name__)
api = Api(app)


# API endpoints

@app.route("/craftsmen", methods=['GET'])
def answer_craftsmen():
    postalcode = request.args.get('postalcode')
    if postalcode is None:
        return jsonify({"error": "Missing request arguments"}), 400
    if postalcode.startswith('{'):
        postalcode = postalcode[1:]
    if postalcode.endswith('}'):
        postalcode = postalcode[:-1]
    postcode = int(postalcode)
    return crr.get(postcode)

@app.route("/craftsmen/<id>", methods=['PATCH'])
def update_craftsmen(id):
    id = int(id)
    return crr.update_craftsman(id, request.json)

@app.route("/craftsmen/reset", methods=['POST'])
def reset_cursor():
    return crr.reset_postcode_cursor()

@app.route("/postcodes", methods=['GET'])
def get_postcodes():
    return jsonify([pc.postcode for pc in crr.all_post_codes.postcodes])


class CraftsmenRankingResource(Resource):
    def __init__(self, all_post_codes, all_service_providers, graph_approach):
        self.all_post_codes = all_post_codes
        self.all_service_providers = all_service_providers
        self.graph_approach = graph_approach
        
        # Needed for further asking the same postcode
        self.i_th = 0
        self.last_requested = -1

        self.initialize_cache()

    def get(self, postcode):
        craftsmen = self.get_craftsmen_ranking(postcode)
        crafts_list = []
        for id, rank in craftsmen:
            crafts_list.append({
                'id': id,
                'name': self.all_service_providers.service_providers[id-1].name,
                'rankingScore': rank
            })
        return jsonify(crafts_list)
    
    def initialize_cache(self):
        craftsman_dict = dict()
        for postcode in tqdm([pc.postcode for pc in self.all_post_codes.postcodes]):
            craftsmen = []
            vertex = self.graph_approach.id_to_vertex(postcode, True)
            for edge in self.graph_approach.graph.es[self.graph_approach.graph.incident(vertex)]:
                edge_connects = [edge.source, edge.target]
                edge_connects.remove(vertex)
                craftsman = self.graph_approach.vertex_to_id(edge_connects.pop(), False)
                crafts_weight = (craftsman, edge['weight'])
                bisect.insort(craftsmen, crafts_weight, key=lambda x: -x[1])
            # craftsmen = [craftsman for craftsman, _ in craftsmen]
            craftsman_dict[postcode] = craftsmen
        self.craftsman_dict = craftsman_dict

    def reset_postcode_cursor(self):
        self.i_th = 0
        return jsonify({ "response": True })

    def get_craftsmen_ranking(self, postcode, update_size=20):
        if self.last_requested != postcode:
            self.reset_postcode_cursor()
            self.last_requested = postcode
        list_length = len(self.craftsman_dict[postcode])
        starting_index = self.i_th * update_size
        if starting_index >= list_length:
            return []
        self.i_th += 1
        end_index = starting_index + update_size
        if end_index > list_length:
            end_index = list_length
        return self.craftsman_dict[postcode][starting_index:end_index]

    def patch(self, craftsman_id):
        patch_request = request.get_json()
        if not patch_request:
            return jsonify({"error": "Missing patch request body"}), 400

        response = self.update_craftsman(craftsman_id, patch_request)
        return response

    def update_craftsman(self, craftsman_id, patch_request):
        try:
            craftsman_vertex = self.graph_approach.id_to_vertex(craftsman_id, False)
            craftsman = self.all_service_providers.service_providers[craftsman_id-1]
            for key, value in patch_request.items():
                if key == 'maxDrivingDistance':
                    craftsman.max_driving_distance = value
                    continue
                if key == 'profilePictureScore':
                    craftsman.picture_score = value
                    continue
                if key == 'profileDescriptionScore':
                    craftsman.description_score = value
            updated_postcodes = self.graph_approach.update_vertex(craftsman_vertex)
            self.update_cache(craftsman_id, updated_postcodes)
        except KeyError:
            traceback.print_exc()
            return jsonify({"Error": f"No such craftsman_id: {craftsman_vertex}"}), 400
        return jsonify({"id": craftsman_id, "updated": patch_request})

    def update_cache(self, craftsman_id, updated_postcodes):
        craftsman_vertex = self.graph_approach.id_to_vertex(craftsman_id, False)
        for postcode in updated_postcodes:
            postcode_vertex = self.graph_approach.id_to_vertex(postcode, True)
            try:
                self.craftsman_dict[postcode].remove(craftsman_id)
            except ValueError:
                pass
            if self.graph_approach.graph.are_connected(craftsman_vertex, postcode_vertex):
                weight = self.graph[craftsman_vertex, postcode_vertex]
                crafts_weight = (craftsman_id, weight)
                bisect.insort(self.craftsman_dict[postcode], crafts_weight, key=lambda x: -x[1])


if __name__ == '__main__':
    apc = AllPostCodes('dataset/postcode.json')
    asp = AllServiceProviders('dataset/service_provider_profile.json', 'dataset/quality_factor_score.json')
    gba = GraphBasedApproach(asp.service_providers, apc.postcodes)

    crr = CraftsmenRankingResource(apc, asp, gba)
    app.run(host="0.0.0.0", port=PORT)
