import requests

headers = {
    'x-api-key': 'CA63472B098944D98AAF2C426DB49FCB'
}

def get_course(course_id):
  r = requests.get(
    # TODO: add parameter to specify term code
    f'https://openapi.data.uwaterloo.ca/v3/Courses/1245/', headers=headers)
  course = r.json()
  return course[0]


print(get_course('006847'))
