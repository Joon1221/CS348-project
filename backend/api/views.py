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
    WHERE subject_code = '{subject_code}' AND catalog_number = '{catalog_number}'
    """

    result = execute(query)
    if not result:
        return '000000'

    for row in result:
        return row[0]


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
        course = []
        for element in row:
            course.append(element)
        courses.append(course)

    return Response({'message': courses})


# ========================================
# Manage User Courses
# ========================================
# DONE:(jade)
#   - Delete course from user
#   - Update course for user
#   - right now we are using subjct_code+catalog_number as the course_id.
#     we need to make sure we are using the actual course_id.
#     Look at View Student Course History for reference (at the very bottom)

@api_view(['GET'])
def get_user_course(request):
    username = unquote(request.GET.get('username', ''))

    query = f"""
    SELECT c.subject_code, c.catalog_number
    FROM CurrentSchedule cs
    JOIN Course c ON cs.course_id = c.course_id
    WHERE cs.username = '{username}'
    """

    result = execute(query)

    courses = []
    for row in result:
        courses.append(' '.join(map(str, row)))

    return Response({'message': courses})


@api_view(['PUT'])
def put_user_course(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']
    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    # Insert the course_id into CurrentSchedule
    insert_query = f"""
    INSERT INTO CurrentSchedule (username, course_id)
    VALUES ('{username}', '{course_id}')
    """

    execute(insert_query)

    return Response({'message': 200})


@api_view(['PUT'])
def update_user_course(request):
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


@api_view(['PUT'])
def delete_user_course(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']

    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    # Update the CurrentSchedule with the new course_id
    query = f"""
    DELETE FROM CurrentSchedule
    WHERE course_id = '{course_id}' and username = '{username}';
    """

    execute(query)

    return Response({'message': 200})

# ========================================
# Login/Sign Up
# ========================================
# TO DO: (joon)
#   - Differentiate between student and professor DONE
#   - Add user info to corresponding table when they sign up DONE


@api_view(['GET'])
def login_user(request):
    print(request.GET)
    username = unquote(request.GET.get('username', ''))
    password = unquote(request.GET.get('password', ''))

    # request_json = json.loads(request.body)
    # username = request_json['username']
    # password = request_json['password']

    # If username and password match, log in
    result = execute(
        f"SELECT * FROM LoginCredentials WHERE username = '{username}' AND pass = '{password}'")
    if result.rowcount is not 0:
        # Check if student or professor
        result = execute(f"SELECT * FROM Prof WHERE username = '{username}'")
        if result.rowcount is not 0:
            return Response({'message': 'professor'}, 200)
        return Response({'message': 'student'}, 200)

    result = execute(
        f"SELECT * FROM LoginCredentials WHERE username = '{username}'")
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
    result = execute(
        f"SELECT * FROM LoginCredentials WHERE username = '{username}'")
    if result.rowcount is not 0:
        return Response({'message': 'username_exists'}, 404)

    # Else, sign up
    result = execute(
        f"INSERT INTO LoginCredentials (username, pass) VALUES ('{username}', '{password}');")

    if is_prof:
        result = execute(f"INSERT INTO Prof (username) VALUES ('{username}');")
        return Response({'message': 'professor'}, 200)

    result = execute(f"INSERT INTO Student (username) VALUES ('{username}');")
    return Response({'message': 'student'}, 200)


@api_view(['PUT'])
def update_password(request):
    request_json = json.loads(request.body)
    username = request_json['username']
    new_password = request_json['new_password']

    # If username matches, allow user to write new password
    result = execute(
        f"SELECT * FROM LoginCredentials WHERE username = '{username}'")
    if result.rowcount is not 0:
        result = execute(
            f"UPDATE LoginCredentials SET password='{new_password}' WHERE username= '{username}'")
        return Response({'message': 'updated_password'}, 200)

        # Else, return error that user doesnt have an account
    else:
        return Response({'message': 'username_doesnt_exists'}, 404)


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

@ api_view(['GET'])
def get_user_course_taken(request):
    username = unquote(request.GET.get('username', ''))

    query = f"""
    SELECT c.subject_code, c.catalog_number, ct.term_code, ct.grade, ct.credit
    FROM CoursesTaken ct
    JOIN Course c ON ct.course_id = c.course_id
    WHERE ct.username = '{username}'
    """

    result = execute(query)

    courses = []
    for row in result:
        courses.append(' '.join(map(str, row)))

    return Response({'message': courses})


@ api_view(['PUT'])
def put_user_course_taken(request):
    request_json = json.loads(request.body)

    username = request_json['username']
    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']
    term_code = request_json['term_code']
    grade = request_json['grade']
    credit = request_json['credit']

    course_id = get_course_id(subject_code, catalog_number)

    # Insert the course_id into CoursesTaken
    insert_query = f"""
    INSERT INTO CoursesTaken (username, course_id, term_code, grade, credit)
    VALUES ({username}, {course_id})
    """

    execute(insert_query)

    return Response({'message': 200})


@ api_view(['PUT'])
def update_user_course_taken(request):
    request_json = json.loads(request.body)

    username = request_json['username']
    cur_subject_code = request_json['cur_subject_code']
    cur_catalog_number = request_json['cur_catalog_number']

    new_subject_code = request_json['new_subject_code']
    new_catalog_number = request_json['new_catalog_number']

    cur_course_id = get_course_id(cur_subject_code, cur_catalog_number)
    new_course_id = get_course_id(new_subject_code, new_catalog_number)

    # Update the CoursesTaken with the new course_id
    update_query = f"""
    UPDATE CoursesTaken
    SET course_id = '{new_course_id}'
    WHERE username = '{username}' AND course_id = '{cur_course_id}'
    """

    execute(update_query)

    return Response({'message': 200})


@ api_view(['PUT'])
def delete_user_course_taken(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']

    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    query = f"""
    DELETE FROM CoursesTaken
    WHERE course_id = '{course_id}' and username = '{username}';
    """

    execute(query)

    return Response({'message': 200})

# ========================================
# Get Subject Code and Catalog Number List
# ========================================
# TO DO:
#   -


@ api_view(['GET'])
def get_subject_codes(request):
    result = execute("SELECT DISTINCT subject_code FROM Course;")
    subject_codes = []
    for row in result:
        subject_codes.append(row[0])
    return Response({'message': subject_codes})


@ api_view(['GET'])
def get_catalog_numbers(request):
    subject_code = unquote(request.GET.get('subject_code', ''))
    result = execute(
        f"SELECT catalog_number FROM Course WHERE subject_code = '{subject_code}';")
    catalog_numbers = []
    for row in result:
        catalog_numbers.append(row[0])
    return Response({'message': catalog_numbers})


# ========================================
# Professor
# ========================================
# TO DO:
#   - adding course to courseteaching table
#   - deleting course to courseteaching table
#   - viewing student usernames of courses taught by a professor

@ api_view(['GET'])
def get_professor_course_taught(request):
    username = unquote(request.GET.get('username', ''))

    query = f"""
    SELECT c.subject_code, c.catalog_number
    FROM CoursesTaught ct
    JOIN Course c ON ct.course_id = c.course_id
    WHERE ct.username = '{username}'
    """

    result = execute(query)

    courses = []
    for row in result:
        courses.append(' '.join(map(str, row)))

    return Response({'message': courses})


@ api_view(['PUT'])
def put_professor_course_taught(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']
    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    # Insert the course_id into CoursesTaugt
    insert_query = f"""
    INSERT INTO CoursesTaugt (username, course_id)
    VALUES ({username}, {course_id})
    """

    execute(insert_query)

    return Response({'message': 200})


@ api_view(['PUT'])
def delete_professor_course_taught(request):
    request_json = json.loads(request.body)

    subject_code = request_json['subject_code']
    catalog_number = request_json['catalog_number']

    username = request_json['username']

    course_id = get_course_id(subject_code, catalog_number)

    query = f"""
    DELETE FROM CoursesTaught
    WHERE course_id = '{course_id}' and username = '{username}';
    """

    execute(query)

    return Response({'message': 200})


@ api_view(['GET'])
def get_students_for_professor(request):
    username = unquote(request.GET.get('username', ''))

    courses_taken_query = f"""
    SELECT DISTINCT s.username, c.subject_code, c.catalog_number
    FROM CoursesTaught ct
    JOIN CoursesTaken ctk ON ct.course_id = ctk.course_id
    JOIN Student s ON ctk.username = s.username
    JOIN Course c ON ctk.course_id = c.course_id
    WHERE ct.username = '{username}'
    """

    current_schedule_query = f""" SELECT DISTINCT s.username, c.subject_code, c.catalog_number
    FROM CoursesTaught ct
    JOIN CoursesTaken ctk ON ct.course_id = ctk.course_id
    JOIN Student s ON ctk.username = s.username
    JOIN Course c ON ctk.course_id = c.course_id
    WHERE ct.username = '{username}'
    """

    courses_taken_result = execute(courses_taken_query)
    current_schedule_result = execute(current_schedule_query)

    students = [row[0] for row in courses_taken_result]

    return Response({'message': students})
