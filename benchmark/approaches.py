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
    
    def update_vertex(self, vertex):
        updated_vertices = self.graph.neighbors(vertex)
        connected_edges = self.graph.es[self.graph.incident(vertex)]
        # Leave one edge in the graph to not drop node
        # Then remove all others
        self.graph.delete_edges(connected_edges[1:])

        # Then insert one new edge
        new_edges, new_weights = self.update_weights(self.all_service_providers[self.vertex_to_id(vertex, False)])
        first_edges, first_weights = new_edges[:2], new_weights['weight'][:2]
        # Then remove the old edge
        self.graph.add_edges(first_edges, attributes={'weight': first_weights})
        self.graph.delete_edges([connected_edges[0]])
        self.graph.add_edges(first_edges, attributes=first_weights)

        # Then insert all other edges
        self.graph.add_edges(new_edges[2:], attributes={'weight': new_weights['weight'][2:]})

        # Save a list on every edge that was updated
        updated_postcodes = {self.vertex_to_id(v, True) for v in updated_vertices}
        updated_postcodes = updated_postcodes.union({sp_id for _, sp_id, _ in new_edges})
        return list(updated_postcodes)

    def update_weights(self, service_provider):
        edges = []
        weights = []
        service_provider_id = service_provider.id
        for postcode in self.all_postcodes:
            postcode_id = postcode.postcode
            if service_provider.can_reach(postcode):
                edges.append((self.id_to_vertex(postcode_id, True),
                              self.id_to_vertex(service_provider_id, False)))
                weights.append(service_provider.rank(postcode))
        return edges, {'weight': weights}

    def fill_edges(self):
        edges = [(i, i+1, -100_000) for i in range(len(self.all_postcodes)+len(self.all_service_providers)-1)]
        self.graph = ig.Graph.TupleList(edges, directed=False, weights=True)
        edges, weights = [], {'weight': []}
        for service_provider in tqdm(self.all_service_providers):
            new_edges, new_weights = self.update_weights(service_provider)
            edges += new_edges
            weights['weight'] += new_weights['weight']
        self.graph.add_edges(edges, attributes=weights)
        self.graph.es.select(weight=-100_000).delete()
