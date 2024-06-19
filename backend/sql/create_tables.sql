CREATE TABLE IF NOT EXISTS Course (
    course_id VARCHAR(10) NOT NULL,
    subject_code VARCHAR(6) NOT NULL,
    catalog_number VARCHAR(6) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_desc VARCHAR(1000) NOT NULL,
    PRIMARY KEY (subject_code, catalog_number)
);
CREATE TABLE Antireq(
    course_id VARCHAR(10) NOT NULL,
    antireq_id VARCHAR(10) NOT NULL
);


CREATE TABLE Prereq(
    course_id VARCHAR(10) NOT NULL,
    antireq_id VARCHAR(10) NOT NULL,
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

CREATE TABLE EnrolledIn (
    student_username VARCHAR(8) NOT NULL,
    course_id INT NOT NULL,
    section_id INT NOT NULL,
    term INT NOT NULL,
    PRIMARY KEY (student_username, section_id),
    FOREIGN KEY (student_username) REFERENCES Student(username),
    FOREIGN KEY (course_id, section_id, term) REFERENCES Section(course_id, section_id, term)
);

CREATE TABLE TaughtBy (
    prof_username VARCHAR(8) NOT NULL,
    course_id INT NOT NULL,
    section_id INT NOT NULL,
    term INT NOT NULL,
    PRIMARY KEY (prof_username, course_id, section_id, term),
    FOREIGN KEY (prof_username) REFERENCES Prof(username),
    FOREIGN KEY (course_id, section_id, term) REFERENCES (course_id, section_id, term)
);

CREATE TABLE Section (
    course_id INT NOT NULL REFERENCES Course(course_id),
    section_number INT NOT NULL,
    section_id INT NOT NULL,
    term INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    weekdays VARCHAR(10) -- M,T,W,Th,F,Sa,Su
    component_type VARCHAR(3),
    currently_enrolled INT NOT NULL,
    total_cap_size INT NOT NULL,
    PRIMARY(course_id, section_id, term) 
);

CREATE TABLE InPersonSection (
    course_id INT NOT NULL ,
    section_number INT NOT NULL,
    section_id INT NOT NULL,
    term INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    weekdays VARCHAR(10) -- M,T,W,Th,F,Sa,Su
    component_type VARCHAR(3),
    currently_enrolled INT NOT NULL,
    total_cap_size INT NOT NULL,
    FOREIGN KEY(course_id, section_number, section_id, term, start_time, end_time, weekdays, component_type, currently_enrolled,total_cap_size) REFERENCES Section(course_id, section_number, section_id, term, start_time, end_time, weekdays, component_type, currently_enrolled,total_cap_size),
    Location VARCHAR(50),
);

CREATE TABLE CurrentSchedule (
    student_username VARCHAR(8) NOT NULL,
    course_id INT NOT NULL,
    section_id INT NOT NULL,
    term INT NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (student_username, section_id),
    FOREIGN KEY (student_username) REFERENCES Student(username),
    FOREIGN KEY (course_id, section_id, term) REFERENCES Section(course_id, section_id, term)
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE CoursesTaken (
    student_username VARCHAR(8) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (student_username, course_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);