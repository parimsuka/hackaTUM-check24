from math import acos, sin, cos, radians


class Coordinates():
    
    def __init__(self, lat, lon) -> None:
        self.lat = radians(lat)
        self.lon = radians(lon)

    def distance_to(self, coordinates) -> float:
        lat = coordinates.lat
        lon = coordinates.lon
        earth_radius = 6371
        return round(acos(sin(self.lat) * sin(lat) + cos(self.lat) * cos(lat) * cos(self.lon - lon)) * earth_radius * 1000)
