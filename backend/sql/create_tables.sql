CREATE TABLE IF NOT EXISTS Course (
    course_id VARCHAR(10) NOT NULL,
    subject_code VARCHAR(6) NOT NULL,
    catalog_number VARCHAR(6) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_desc VARCHAR(1000) NOT NULL,
    PRIMARY KEY (course_id, subject_code, catalog_number)
);

CREATE TABLE IF NOT EXISTS Prof (
    username VARCHAR(8) NOT NULL PRIMARY KEY -- change to reference?
    -- name VARCHAR(50) NOT NULL,
    -- rating INT -- might be NULL if the prof is new? not sure how uwflow works
);

CREATE TABLE IF NOT EXISTS Student (
    username VARCHAR(8) NOT NULL PRIMARY KEY -- change to reference?
    -- acad_level VARCHAR(3) -- might be NULL if student is going into first year? idk
);

CREATE TABLE IF NOT EXISTS CoursesTaught (
    username VARCHAR(8) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (username, course_id)
    -- FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE IF NOT EXISTS CurrentSchedule (
    username VARCHAR(12) NOT NULL,
    -- course_id INT NOT NULL,
    -- section_id INT NOT NULL,
    -- term INT NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (username, course_id)
    -- FOREIGN KEY (student_username) REFERENCES Student(username),
    -- FOREIGN KEY (course_id, section_id, term) REFERENCES Section(course_id, section_id, term)
    -- FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE IF NOT EXISTS CoursesTaken (
    username VARCHAR(8) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    term_code VARCHAR(4) NOT NULL,
    grade INT NOT NULL,
    credit FLOAT NOT NULL,
    PRIMARY KEY (username, course_id)
    -- FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE IF NOT EXISTS LoginCredentials (
    username VARCHAR(12) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    PRIMARY KEY (username) 
);

-- CREATE TABLE Antireq(
--     course_id VARCHAR(10) NOT NULL,
--     antireq_id VARCHAR(10) NOT NULL
-- );


-- CREATE TABLE Prereq(
--     course_id VARCHAR(10) NOT NULL,
--     antireq_id VARCHAR(10) NOT NULL,
-- );

-- CREATE TABLE EnrolledIn (
--     student_username VARCHAR(8) NOT NULL,
--     course_id INT NOT NULL,
--     section_id INT NOT NULL,
--     term INT NOT NULL,
--     PRIMARY KEY (student_username, section_id),
--     FOREIGN KEY (student_username) REFERENCES Student(username),
--     FOREIGN KEY (course_id, section_id, term) REFERENCES Section(course_id, section_id, term)
-- );

-- CREATE TABLE TaughtBy (
--     prof_username VARCHAR(8) NOT NULL,
--     course_id INT NOT NULL,
--     section_id INT NOT NULL,
--     term INT NOT NULL,
--     PRIMARY KEY (prof_username, course_id, section_id, term),
--     FOREIGN KEY (prof_username) REFERENCES Prof(username),
--     FOREIGN KEY (course_id, section_id, term) REFERENCES (course_id, section_id, term)
-- );

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
    location VARCHAR(50),
    PRIMARY(course_id, section_id, term),
);
