CREATE TABLE Course (
    units FLOAT NOT NULL,
    department_name VARCHAR(6) NOT NULL,
    course_desc VARCHAR(1000) NOT NULL,
    course_code VARCHAR(10) NOT NULL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

CREATE TABLE Antireq(
    course_code VARCHAR(10) NOT NULL,
    antireq_code VARCHAR(10) NOT NULL
);


CREATE TABLE Prereq(
    course_code VARCHAR(10) NOT NULL,
    antireq_code VARCHAR(10) NOT NULL,
);


CREATE TABLE Prof (
    username VARCHAR(8) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    rating INT -- might be NULL if the prof is new? not sure how uwflow works
);

CREATE TABLE Student (
    username VARCHAR(8) NOT NULL PRIMARY KEY,
    acad_level VARCHAR(3) -- might be NULL if student is going into first year? idk
);

CREATE TABLE --incomplete

CREATE TABLE Schedule (
    student_username VARCHAR(8) NOT NULL,
    section_id VARCHAR(4) NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (student_username, section_id),
    FOREIGN KEY (student_username) REFERENCES Student(username),
    FOREIGN KEY (section_id) REFERENCES Section(section_id), -- assuming the sections/components table is called "Section"
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);

CREATE TABLE Courses_Taken (
    student_username VARCHAR(8) NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    PRIMARY KEY (student_username, course_code),
    FOREIGN KEY (course_code) REFERENCES Course(course_code)
);
