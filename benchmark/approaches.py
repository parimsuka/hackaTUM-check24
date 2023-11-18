import igraph as ig
from tqdm import tqdm


class GraphBasedApproach():

    def __init__(self, all_service_providers, all_postcodes, from_savefile=None) -> None:
        self.all_service_providers = all_service_providers
        self.all_postcodes = all_postcodes
        num_postcodes = len(all_postcodes)
        self.v_to_id = {i: pc.postcode for i, pc in enumerate(all_postcodes)}
        service_provider_translation = {(i+num_postcodes): -sp.id for i, sp in enumerate(all_service_providers)}
        self.v_to_id.update(service_provider_translation)
        self.id_to_v = {v: k for k, v in self.v_to_id.items()}

        if from_savefile is not None:
            with open(from_savefile, 'r') as graphfile:
                self.graph = ig.Graph.Read(graphfile)
        else:
            self.fill_edges()

    def id_to_vertex(self, id, is_postcode):
        if not is_postcode:
            return self.id_to_v[-id]
        return self.id_to_v[id]

    def vertex_to_id(self, vertex, is_postcode):
        if not is_postcode:
            return -self.v_to_id[vertex]
        return self.v_to_id[vertex]

    def fill_edges(self):
        edges = [(i, i+1, -100_000) for i in range(len(self.all_postcodes)+len(self.all_service_providers)-1)]
        for postcode in tqdm(self.all_postcodes):
            postcode_id = postcode.postcode
            for service_provider in self.all_service_providers:
                service_provider_id = service_provider.id
                if service_provider.can_reach(postcode):
                    edges.append((self.id_to_vertex(postcode_id, True),
                                  self.id_to_vertex(service_provider_id, False),
                                  service_provider.rank(postcode)))
        self.graph = ig.Graph.TupleList(edges, directed=False, weights=True)
        self.graph.es.select(weight=-100_000).delete()
