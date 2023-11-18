from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from postcode import AllPostCodes
from service_provider import AllServiceProviders
from approaches import GraphBasedApproach
import bisect
from tqdm import tqdm
import time
import os

app = Flask(__name__)
api = Api(app)

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
        return jsonify({"postcode": postcode, "craftsmen": craftsmen})

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

    def get_craftsmen_ranking(self, postcode, update_size=20):
        if self.last_requested != postcode:
            self.i_th = 0
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
            return jsonify({"error": f"No such craftsman_id: {craftsman_vertex}"}), 400
        return jsonify({"id": craftsman_id, "updated": patch_request})

    def update_cache(self, craftsman_id, updated_postcodes):
        craftsman_vertex = self.graph_approach.id_to_vertex(craftsman_id, False)
        for postcode in updated_postcodes:
            postcode_vertex = self.graph_approach.id_to_vertex(postcode, True)
            self.craftsman_dict[postcode].pop(craftsman_id, None)
            if self.graph_approach.graph.are_connected(craftsman_vertex, postcode_vertex):
                crafts_weight = self.graph[craftsman_vertex, postcode_vertex]
                bisect.insort(self.craftsman_dict[postcode], crafts_weight, key=lambda x: -x[1])


if __name__ == '__main__':
    apc = AllPostCodes('dataset/postcode.json')
    asp = AllServiceProviders('dataset/service_provider_profile.json', 'dataset/quality_factor_score.json')
    gba = GraphBasedApproach(asp.service_providers, apc.postcodes)

    api.add_resource(CraftsmenRankingResource, '/craftsmen', resource_class_kwargs={'all_post_codes': apc, 'all_service_providers': asp, 'graph_approach': gba})

    app.run(debug=True)
