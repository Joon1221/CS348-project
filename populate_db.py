# running this script will populate the database with course offerings/information using UWaterloo OpenData API
from sqlalchemy import create_engine, text

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

# Create a new table
connection.execute(text("""
    CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INT
    )
"""))

# Insert data into the table
connection.execute(text("""
    INSERT INTO test_table (name, age) VALUES 
    ('Alice', 30), 
    ('Bob', 25)
"""))

# Query the table
result = connection.execute(text("SELECT * FROM test_table"))

# Print the results
for row in result:
    print(row)

# Close the connection
connection.close()