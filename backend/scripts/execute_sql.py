from sqlalchemy import create_engine, text
import argparse

def execute_file(filename, username='postgres', password='1234'):
    file = open(f'../sql/{filename}.sql', 'r')
    query = file.read()
    file.close()

    return execute(query, username, password)

def execute(query, username='postgres', password='1234'):
    host = 'localhost'
    port = '5432'
    database = 'postgres'

    db = create_engine(f'postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}', future=True)

    with db.connect() as conn:
        result = conn.execute(text(query))
        conn.commit()
        return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    # Need to add support for return_result and query without filename
    parser.add_argument("-f", dest="filename", required=True)
    arguments = parser.parse_args()
    results = execute_file(arguments.filename)
    print(results)
    for row in results:
        print(row)