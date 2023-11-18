from coordinates import Coordinates
import json


class PostCode():
    
    def __init__(self, postcode, coordinates, distance_group) -> None:
        self.postcode = postcode
        self.coordinates = coordinates
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
                coordinates = Coordinates(lat, lon)
                distance_group = postcode['postcode_extension_distance_group']
                pc = PostCode(code, coordinates, distance_group)
                postcodes.append(pc)
        return postcodes
    
    def __iter__(self):
        for postcode in self.postcodes:
            yield postcode
