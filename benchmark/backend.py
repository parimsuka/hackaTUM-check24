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

craftsman_dict=dict()

class CraftsmenRankingResource(Resource):
    def __init__(self, apc, asp, gba):
        self.apc = apc
        self.asp = asp
        self.gba = gba

    def get(self, postcode):
        craftsmen = self.get_craftsmen_ranking(postcode)
        return jsonify({"postcode": postcode, "craftsmen": craftsmen})

    def pre_process(self):
        for postcode in tqdm([pc.postcode for pc in apc.postcodes[:1]]):
            craftsmen = []
            vertex = gba.id_to_vertex(postcode, True)
            for edge in self.gba.graph.es[self.gba.graph.incident(vertex)]:
                edge_connects = [edge.source, edge.target]
                edge_connects.remove(vertex)
                craftsman = self.gba.vertex_to_id(edge_connects.pop(), False)
                crafts_weight = (craftsman, edge['weight'])
                bisect.insort(craftsmen, crafts_weight, key=lambda x: -x[1])
            # craftsmen = [craftsman for craftsman, _ in craftsmen]
            craftsman_dict[postcode] = craftsmen

        time.sleep(1)
        return craftsman_dict

    def get_craftsmen_ranking(self, postcode):
        return craftsman_dict[postcode][:20]

    def patch(self, craftsman_id):
        patch_request = request.get_json()
        if not patch_request:
            return jsonify({"error": "Missing patch request body"}), 400

        response = self.update_craftsman(craftsman_id, patch_request)
        return jsonify(response)

    def update_craftsman(self, craftsman_id, patch_request):
        # Your logic to update craftsman goes here
        # TODO
        return {"id": craftsman_id, "updated": patch_request}


if __name__ == '__main__':
    apc = AllPostCodes('dataset/postcode.json')
    asp = AllServiceProviders('dataset/service_provider_profile.json', 'dataset/quality_factor_score.json')
    gba = GraphBasedApproach(asp.service_providers, apc.postcodes)

    api.add_resource(CraftsmenRankingResource, '/craftsmen', resource_class_kwargs={'apc': apc, 'asp': asp, 'gba': gba})

    app.run(debug=True)
