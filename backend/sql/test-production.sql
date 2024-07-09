-- the call to these SQL queries are located in backend/api/views.py
----------------------------------------
INSERT INTO CurrentSchedule (course_id) VALUES ('MATH 135');
INSERT INTO CurrentSchedule (course_id) VALUES ('SE 463');
SELECT * FROM CurrentSchedule;
----------------------------------------
SELECT * FROM Course LIMIT 10;
----------------------------------------
INSERT INTO LoginCredentials (student_username, student_password) VALUES ('Bob', 'pass')
SELECT * FROM LoginCredentials WHERE student_username = 'Bob' AND student_password = 'pass'; 
----------------------------------------
