-- the call to these SQL queries are located in backend/api/views.py
----------------------------------------
-- Feature 1: Managing the student's current schedule
-- Query 1:
-- Adding CS 348
SELECT * FROM CurrentSchedule WHERE username = 'bob' AND course_id = '004417' -- Check if course already exists. If not, proceed
INSERT INTO CurrentSchedule (username, course_id) VALUES ('bob', '004417')

-- Adding CS 341
SELECT * FROM CurrentSchedule WHERE username = 'bob' AND course_id = '004392'
-- Check if course already exists. If not, proceed
INSERT INTO CurrentSchedule (username, course_id) VALUES ('bob', '004392')

SELECT c.subject_code, c.catalog_number FROM CurrentSchedule cs
JOIN Course c ON cs.course_id = c.course_id WHERE cs.username = 'bob'

-- Query 2:
-- Deleting CS 348
DELETE FROM CurrentSchedule WHERE course_id = '004417' and username = 'bob'

SELECT c.subject_code, c.catalog_number FROM CurrentSchedule cs
JOIN Course c ON cs.course_id = c.course_id WHERE cs.username = 'bob'

-- Feature 2: View courses from the course list
SELECT * FROM Course;

-- Feature 3: Log in/Sign up
-- Query 1:
SELECT * FROM LoginCredentials WHERE username = 'alex123'
-- Check if credentials with the username already exists. If not, proceed.
INSERT INTO LoginCredentials (username, pass) VALUES ('alex123', 'mypass')

-- If user is professor
INSERT INTO Prof (username) VALUES ('alex123') 
-- If user is student
INSERT INTO Student (username) VALUES ('alex123')

-- Query 2:
SELECT * FROM LoginCredentials WHERE username = 'alex123' AND pass = 'mypass'
-- If credentials match (The SELECT statement returns a match), proceed

SELECT * FROM Prof WHERE username = 'alex123' 
-- If user is a professor, proceed to the professor home page. If not, proceed to the user home page.

-- Query 3:
SELECT * FROM LoginCredentials WHERE username = 'alex123'
-- If username exists, proceed.

UPDATE LoginCredentials SET pass='newpass' WHERE username= 'alex123'


-- Feature 4: Special access to admin users (Professors):
-- Query 1:
-- Get information of students that have already taken at least one course that the professor is teaching
SELECT DISTINCT s.username, c.subject_code, c.catalog_number, ctk.term_code, ctk.grade, ctk.credit FROM CoursesTaught ct
JOIN CoursesTaken ctk ON ct.course_id = ctk.course_id
JOIN Student s ON ctk.username = s.username
JOIN Course c ON ctk.course_id = c.course_id
WHERE ct.username = 'prof1'

-- Query 2:
-- Get information of students that are currently taking at least one course that the professor is teaching
SELECT DISTINCT s.username, c.subject_code, c.catalog_number FROM CoursesTaught ct
JOIN CurrentSchedule cs ON ct.course_id = cs.course_id
JOIN Student s ON cs.username = s.username
JOIN Course c ON cs.course_id = c.course_id
WHERE ct.username = 'prof1'

Feature 5: Viewing student course history
-- Query:
INSERT INTO CoursesTaken (username, course_id, term_code, grade, credit) 
VALUES ('jacob', '004417', 'F21', 89, 0.5)

INSERT INTO CoursesTaken (username, course_id, term_code, grade, credit) 
VALUES ('jacob', '004392' , 'F22', 70, 0.5)

SELECT c.subject_code, c.catalog_number, ct.term_code, ct.grade, ct.credit 
FROM CoursesTaken ct
JOIN Course c ON ct.course_id = c.course_id
WHERE ct.username = 'jacob'
