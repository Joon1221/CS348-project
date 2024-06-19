from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sqlalchemy import create_engine, text


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
    output = ""
    courses = []
    for row in result:
        courses.append(','.join(map(str, row)))

    return Response({'message': courses})
