import requests

headers = {
    'x-api-key': 'CA63472B098944D98AAF2C426DB49FCB'
}
# returns: a comma separated list of tuples of the values from the json file

def parse_json(course_id):
  r = requests.get(
    # TODO: add parameter to specify term code
    f'https://openapi.data.uwaterloo.ca/v3/Courses/1245/', headers=headers)
  course = r.json()
  return course[0]


print(parse_json('006847'))
