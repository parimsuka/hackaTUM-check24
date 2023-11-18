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
