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
# TO DO:(jade)
#   - Filter by department, etc
#   - Order based on filter
#   - Send list of lists instead of list of strings

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
# TO DO:(jade)
#   - Delete course from user
#   - Update course for user

@api_view(['GET'])
def get_user_course(request):
    # print("HELLO", request.body)
    # request_json = json.loads(request.body)
    username = unquote(request.GET.get('username', ''))
    # username = 'name'

    # print("HELLO", request_json)

    result = execute(
        f"SELECT * FROM CurrentSchedule WHERE username = '{username}' LIMIT 10")
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
        f"INSERT INTO CurrentSchedule (username, course_id) VALUES('{username}', '{course}')")
    return Response({'message': 200})


# ========================================
# Login/Sign Up Feature
# ========================================
# TO DO: (joon)
#   - Differentiate between student and professor DONE
#   - Add user info to corresponding table when they sign up DONE

@api_view(['GET'])
def login_user(request):
    request_json = json.loads(request.body)
    username = request_json['username']
    password = request_json['password']

    # If username and password match, log in
    result = execute(f"SELECT * FROM LoginCredentials WHERE username = '{username}' AND student_password = '{password}'")
    if result.rowcount is not 0:
        # Check if student or professor
        result = execute(f"SELECT * FROM Prof WHERE username = '{username}'")
        if result.rowcount is not 0:
            return Response({'message': 'professor'}, 200)
        return Response({'message': 'student'}, 200)

    result = execute(f"SELECT * FROM LoginCredentials WHERE username = '{username}'")
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
    is_prof = request_json['is_prof']

    # If username matches, the username already exists
    result = execute(f"SELECT * FROM LoginCredentials WHERE username = '{username}'")
    if result.rowcount is not 0:
        return Response({'message': 'username_exists'}, 404)

    # Else, sign up
    result = execute(f"INSERT INTO LoginCredentials (username, student_password) VALUES ('{username}', '{password}');")

    if is_prof:
        result = execute(f"INSERT INTO Prof (username) VALUES ('{username}');") 
    else:
        result = execute(f"INSERT INTO Student (username) VALUES ('{username}');")

    return Response({'message': 'signup_success'}, 200)


# ========================================
# View Class/Section List
# ========================================
# TO DO:
#   - Select section based on:
#       - Professor
#       - Building
#       - Department

# ========================================
# View Student Course History
# ========================================
# TO DO:
#   - Return info such as GPA Average, total credits, etc
#   - prerequisite checking?

