from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sqlalchemy import create_engine, text
import json
from urllib.parse import unquote


def execute(query, username='postgres', password='1234'):
    host = 'localhost'
    port = '5432'
    database = 'postgres'

    db = create_engine(
        f'postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}')

    with db.connect() as conn:
        result = conn.execute(text(query))
        conn.commit()
        return result


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Bob'})


# ========================================
# View All Courses Feature
# ========================================
# TO DO:
#   - Filter by department, etc

@api_view(['GET'])
def get_all_courses(request):
    result = execute("SELECT * FROM Course LIMIT 10")
    courses = []
    for row in result:
        courses.append(','.join(map(str, row)))

    return Response({'message': courses})


# ========================================
# Manage User Courses Feature
# ========================================
# TO DO:
#   - Delete course from user
#   - Access user courses based on username

@api_view(['GET'])
def get_user_course(request):
    # print("HELLO", request.body)
   # request_json = json.loads(request.body)
    username = unquote(request.GET.get('username', ''))
    # username = 'name'

    # print("HELLO", request_json)

    result = execute(
        f"SELECT * FROM CurrentSchedule WHERE student_username = '{username}' LIMIT 10")
    courses = []
    for row in result:
        courses.append(','.join(map(str, row)))

    return Response({'message': courses})


@api_view(['PUT'])
def put_user_course(request):
    request_json = json.loads(request.body)

    course = request_json['data']
    username = request_json['username']

    execute(
        f"INSERT INTO CurrentSchedule (student_username, course_id) VALUES('{username}', '{course}')")
    return Response({'message': 200})


# ========================================
# Login/Sign Up Feature
# ========================================
# TO DO:
#   -

@api_view(['GET'])
def login_user(request):
    request_json = json.loads(request.body)
    username = request_json['username']
    password = request_json['password']

    result = execute(
        f"SELECT * FROM LoginCredentials WHERE student_username = '{username}' AND student_password = '{password}'")

    # If there is a match, log in
    if result.rowcount is not 0:
        return Response({'message': 'login_success'}, 200)

    result = execute(
        f"SELECT * FROM LoginCredentials WHERE student_username = '{username}'")

    # If there is a match, the password is incorrect
    if result.rowcount is not 0:
        return Response({'message': 'incorrect_password'}, 404)
    # Else, offer user to create an account
    else:
        return Response({'message': 'no_acct'}, 404)


@api_view(['PUT'])
def signup_user(request):
    request_json = json.loads(request.body)
    username = request_json['username']
    password = request_json['password']

    result = execute(
        f"SELECT * FROM LoginCredentials WHERE student_username = '{username}'")

    # If there is a match, the username already exists
    if result.rowcount is not 0:
        return Response({'message': 'username_exists'}, 404)

    result = execute(
        f"INSERT INTO LoginCredentials (student_username, student_password) VALUES ('{username}', '{password}');")
    return Response({'message': 'signup_success'}, 200)
