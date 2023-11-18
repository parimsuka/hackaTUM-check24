from coordinates import Coordinates
import json


class PostCode():
    
    def __init__(self, postcode, lon, lat, distance_group) -> None:
        self.postcode = postcode
        self.coordinates = Coordinates(lat=lat, lon=lon)
        self.distance_bonus = 0
        if distance_group == 'group_b':
            self.distance_bonus = -2000
        elif distance_group == 'group_c':
            self.distance_bonus = -5000

class AllPostCodes():
    
    def __init__(self, post_code_file):
        self.postcodes = self.parse_post_codes(post_code_file)

    def parse_post_codes(self, filename):
        with open(filename, 'r') as postcodefile:
            postcodelist = json.load(postcodefile)
            postcodes = []
            for postcode in postcodelist:
                code = int(postcode['postcode'])
                lon = float(postcode['lon'])
                lat = float(postcode['lat'])
                distance_group = postcode['postcode_extension_distance_group']
                pc = PostCode(code, lon, lat, distance_group)
                postcodes.append(pc)
        return postcodes
    
    def __iter__(self):
        for postcode in self.postcodes:
            yield postcode
