import requests

headers = {
  'x-api-key': 'CA63472B098944D98AAF2C426DB49FCB'
}
# returns: a comma separated list of tuples of the values from the json file

def get_courses():
  r = requests.get(f'https://openapi.data.uwaterloo.ca/v3/Courses/1245/', headers=headers)
  course = r.json()
  return course
