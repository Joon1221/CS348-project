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

def get_course_id(subject_code, catalog_number):
    query = f"""
    SELECT course_id FROM Course
    WHERE subject_code = {subject_code} AND catalog_number = {catalog_number}
    """
    
    result = execute(query)
    if not result:
        return Response({'message': 'Course not found'}, 404)
    
    return result[0][0] 

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Bob'})


# ========================================
# View All Courses
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
# Manage User Courses
# ========================================
# TO DO:(jade)
#   - Delete course from user
#   - Update course for user
#   - right now we are using subjct_code+catalog_number as the course_id. 
#     we need to make sure we are using the actual course_id.
#     Look at View Student Course History for reference (at the very bottom)

@api_view(['GET'])
def get_user_course(request):
    username = unquote(request.GET.get('username', ''))

    result = execute(f"SELECT * FROM CurrentSchedule WHERE username = '{username}'")
    
    courses = []
    for row in result:
        courses.append(','.join(map(str, row))) # need to fix courses.append here

    return Response({'message': courses})


@api_view(['PUT'])
def put_user_course(request):
    request_json = json.loads(request.body)

    course = request_json['data']
    username = request_json['username']

    execute(f"INSERT INTO CurrentSchedule (username, course_id) VALUES('{username}', '{course}')")
    return Response({'message': 200})


# ========================================
# Login/Sign Up
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

@api_view(['GET'])
def get_user_course_taken(request):
    username = unquote(request.GET.get('username', ''))

    query = f"""
    SELECT c.subject_code, c.catalog_number 
    FROM CoursesTaken ct
    JOIN Course c ON ct.course_id = c.course_id
    WHERE ct.username = {username}
    """

    result = execute(query, username)
    
    courses = []
    for row in result:
        courses.append(' '.join(map(str, row)))

    return Response({'message': courses})


@api_view(['PUT'])
def put_user_course_taken(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']
    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    # Insert the course_id into CurrentSchedule
    insert_query = f"""
    INSERT INTO CurrentSchedule (username, course_id)
    VALUES ({username}, {course_id})
    """
    
    execute(insert_query)

    return Response({'message': 200})

@api_view(['PUT'])
def update_user_course_taken(request):
    request_json = json.loads(request.body)

    username = request_json['username']
    cur_subject_code = request_json['cur_subject_code']
    cur_catalog_number = request_json['cur_catalog_number']

    new_subject_code = request_json['new_subject_code']
    new_catalog_number = request_json['new_catalog_number']

    cur_course_id = get_course_id(cur_subject_code, cur_catalog_number)
    new_course_id = get_course_id(new_subject_code, new_catalog_number)

    # Update the CurrentSchedule with the new course_id
    update_query = f"""
    UPDATE CurrentSchedule
    SET course_id = '{new_course_id}'
    WHERE username = '{username}' AND course_id = '{cur_course_id}'
    """

    execute(update_query)

    return Response({'message': 200})

