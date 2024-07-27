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
SELECT * FROM Section LIMIT 10;
----------------------------------------
INSERT INTO Prof (prof_username) VALUES ('phillip')
SELECT * FROM Prof WHERE prof_username = 'phillip'
----------------------------------------
SELECT DISTINCT s.username, c.subject_code, c.catalog_number FROM CoursesTaught ct
JOIN CoursesTaken ctk ON ct.course_id = ctk.course_id
JOIN Student s ON ctk.username = s.username
JOIN Course c ON ctk.course_id = c.course_id
WHERE ct.username = 'phillip'
----------------------------------------
INSERT INTO CoursesTaken (username, course_id, term_code, grade, credit) 
VALUES ('student1', '012345', 'F22', 90, 0.5)

SELECT c.subject_code, c.catalog_number, ct.term_code, ct.grade, ct.credit 
FROM CoursesTaken ct
JOIN Course c ON ct.course_id = c.course_id
WHERE ct.username = 'student1'
----------------------------------------
SELECT * FROM LoginCredentials WHERE username = 'alex123'
-- If username exists, proceed.

UPDATE LoginCredentials SET pass='newpass' WHERE username= 'alex123'
SELECT * FROM LoginCredentials WHERE username = 'alex123'

