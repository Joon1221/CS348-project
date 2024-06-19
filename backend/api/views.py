from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sqlalchemy import create_engine, text
import json


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


@api_view(['GET'])
def get_all_courses(request):
    result = execute("SELECT * FROM Course LIMIT 10")
    courses = []
    for row in result:
        courses.append(','.join(map(str, row)))

    return Response({'message': courses})


@api_view(['GET'])
def get_user_course(request):
    result = execute("SELECT * FROM CurrentSchedule LIMIT 10")
    courses = []
    for row in result:
        courses.append(','.join(map(str, row)))

    return Response({'message': courses})


@api_view(['PUT'])
def put_user_course(request):
    course = json.loads(request.body)['data']

    execute(f"INSERT INTO CurrentSchedule (course_id) VALUES('{course}')")
    return Response({'message': 200})
