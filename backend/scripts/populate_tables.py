# running this script will populate the database with course offerings/information using UWaterloo OpenData API
from sqlalchemy import create_engine, text
from execute_sql import execute_file, execute

def populate_table(table_name, tuple_structure, tuples):
    # Insert data into the table
    connection.execute(text(f"""INSERT INTO {table_name} {tuple_structure} VALUES 
        {tuples}"""))

    # Commit the transaction
    connection.commit()

# Define the PostgreSQL database URL
username = 'postgres'
password = '1234'
host = 'localhost'
port = '5432'
database = 'postgres'

# Create the engine
engine = create_engine(f'postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}')

# Connect to the database
connection = engine.connect()

# Check if the connection is established
if connection:
    print("Connection to the PostgreSQL database established successfully.")

# Connect to the database and execute a query
with engine.connect() as connection:
    # Create table if not exists
    connection.execute(text("""
        CREATE TABLE IF NOT EXISTS test_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            age INT
        )
    """))

populate_table("test_table", "(\"name\", age)", "(\"Amy\", 46), (\"Bob\", 66)")

# Execute a SELECT query
result = connection.execute(text("SELECT * FROM test_table"))

# Fetch and print the results
for row in result:
        print(row)


# Close the connection
connection.close()