How to load the dataset:

- python populate_db.py  

This script will use UWaterloo's OpenData API to query the course offerings and information. It will use that data and create and populate the appropriate tables in our database.

Installations:
-In main project directory, run:
    pip install djangorestframework django-cors-headers

-cd frontend/frontend and run:
    npm install axios

To run the app:
- cd backend and run:
    python manage.py runserver

- In a new terminal, cd frontend/frontend and run:
    npm start