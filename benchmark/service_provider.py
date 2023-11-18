import json
from coordinates import Coordinates


class ServiceProvider():
    
    def __init__(self, id, lon, lat, max_driving_distance, picture_score, description_score) -> None:
        self.id = id
        self.coordinates = Coordinates(lat, lon)
        self.max_driving_distance = max_driving_distance
        self.picture_score = picture_score
        self.description_score = description_score
        self.init_profile_score()

    def init_profile_score(self):
        self.profile_score = 0.4*self.picture_score + 0.6*self.description_score

    def can_reach(self, coordinates, group_bonus):
        distance = self.coordinates.distance_to(coordinates) + group_bonus
        return distance <= self.max_driving_distance

    def rank(self, coordinates):
        distance = self.coordinates.distance_to(coordinates)
        default_distance = 80
        distance_score = 1 - (distance/default_distance)
        distance_weight = 0.01 if distance > default_distance else 0.15
        return distance_weight * distance_score + (1 - distance_weight) * self.profile_score

class AllServiceProviders():
    
    def __init__(self, service_provider_filename, quality_filename):
        self.service_providers = self.parse_service_providers(service_provider_filename, quality_filename)

    def parse_service_providers(self, service_provider_filename, quality_filename):
        quality_dict = None
        with open(quality_filename, 'r') as quality_file:
            quality_dict = {e['profile_id']: {
                'picture_score': e['profile_picture_score'],
                'description_score': e['profile_description_score']
                } for e in json.load(quality_file)}
        if quality_dict is None:
            return
        with open(service_provider_filename, 'r') as service_provider_file:
            service_providers = []
            for i, service_provider in enumerate(json.load(service_provider_file)):
                id = int(service_provider['id'])
                lon = float(service_provider['lon'])
                lat = float(service_provider['lat'])
                max_driving_distance = int(service_provider['max_driving_distance'])
                picture_score = quality_dict[i+1]['picture_score']
                description_score = quality_dict[i+1]['description_score']
                sp = ServiceProvider(id, lon, lat, max_driving_distance, picture_score, description_score)
                service_providers.append(sp)
        return service_providers
    
    def __iter__(self):
        for service_provider in self.service_providers:
            yield service_provider
