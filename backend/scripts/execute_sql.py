from sqlalchemy import create_engine, text
from sys import argv
import re
import argparse

def execute_file(filename, username='postgres', password='1234', return_result=False):
    file = open(f'../sql/{filename}.sql', 'r')
    query = file.read()
    file.close()

    execute(query, username, password, return_result)

def execute(query, username='postgres', password='1234', return_result=False):
    host = 'localhost'
    port = '5432'
    database = 'postgres'

    db = create_engine(f'postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}')

    sql_commands = query.split(';')
    result_list = []

    print(sql_commands)
    with db.connect() as conn:
        for command in sql_commands:
            if command:
                if return_result:
                    result = conn.execute(text(command))
                    for result in conn.execute(text(command)):
                        for row in result:
                            print(row)
                            
                else:
                    conn.execute(text(command))
                conn.commit()

        return result_list

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", dest="filename", required=True)
    arguments = parser.parse_args()
    results = execute_file(arguments.filename, return_result=True)
    for result in results:
        for row in result:
            print(row)