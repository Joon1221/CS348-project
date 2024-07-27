## Getting Started
### How to load the dataset

Run the following commands:

`cd backend/scripts`
`python create_tables.py`
`python populate_tables.py`

This script will use UWaterloo's OpenData API to query the course offerings and information. It will use that data and create and populate the appropriate tables in our database.

### Installations
In main project directory, run: `pip install djangorestframework django-cors-headers`

Then, in the terminal type: `cd frontend/frontend` and run:
    `npm install axios`
    `npm install react-scripts`
    

### How to run the application
- cd into backend and run:
    `python manage.py runserver`

- In a new terminal, cd frontend/frontend and run:
    `npm start`

### How to generate the "production" dataset and load the database
We are querying data from the [UWaterloo OpenData API](https://openapi.data.uwaterloo.ca/api-docs/index.html).This resource provides us with lists of JSON objects that contain information on courses including the course code, description, offerings, etc. We use backend/scripts/parse_json.py to get a comma separated list of tuples of the values from the json file. We then use backend/scripts/populate_tables.py to insert these tuples into the desired database. 


## List of Implemented Features

The following features have been implemented for Milestone 2.

The SQL queries are found in the backend at backend/api/views.py and the feature implemention details are found below. 

1. Login/Sign in (Milestone 2)
![alt text](img/SignInPage.png)
![alt text](img/SignUpPage.png)
The implementation of these features are located in:
- frontend/frontend/src/components/Auth/SignIn.jsx
- frontend/frontend/src/components/Auth/SignUp.jsx

2. Manage user schedule (Milestone 2)
![alt text](img/ManageSchedule.png)
The implemention of this feature is located in:
- frontend/frontend/src/components/ManageSchedule.jsx

3. View Course List (Milesone 2)
![alt text](img/ViewCourseList.png)
The implementation of this feature is located in:
- frontend/frontend/src/components/CourseList.jsx