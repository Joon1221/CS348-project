# running this script will populate the database with course offerings/information using UWaterloo OpenData API
from sqlalchemy import create_engine, text
from execute_sql import execute_file, execute
from parse_json import get_courses, get_sections, get_course_ids

def populate_table(table_name, tuple_structure, tuples):
    # Insert data into the table
    execute(f"""INSERT INTO {table_name} {tuple_structure} VALUES 
        {tuples}""")


course_json = get_courses()
course_ids_json = get_course_ids()

courses = []
for course in course_json:
    # Manually skip redundant courses
    if course['courseId'] in ['010423', '012710', '000044', '000045']:
        continue 
    
    # Create tuples and append
    title = course['title'].replace('\'', '')
    desc = course['descriptionAbbreviated'].replace('\'', '')
    cur_course = (course['courseId'], course['subjectCode'], course['catalogNumber'], title, desc)
    
    courses.append(cur_course)

populate_table("Course", "(course_id, subject_code, catalog_number, course_name, course_desc)", str(courses)[1:-1])

sections = []
# getting all sections for each course
for course in course_ids_json:
    sections_json = get_sections(course)
    for section in sections_json:
        cur_section = (section['courseId'], section['classSection'], section['termCode'], section['classMeetingStartTime'], section['classMeetingEndTime'], section['classMeetingWeekPatternCode'], course['courseComponent'], course['enrolledStudents'], course['maxEnrollmentCapacity'], section['locationName'])
        section.append(cur_section)

populate_table("Section", "(course_id, section_number, term, start_time, end_time, weekdays, component_type, currently_enrolled, total_cap_size, location)", str(courses)[1:-1])

# Execute a SELECT query
# result = execute("SELECT * FROM Course")

# Fetch and print the results
# for row in result:
    # print(row)

