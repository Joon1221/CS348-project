import React, { useState, useEffect } from "react";
import axios from "axios";

function HelloWorld() {
  const [curUserCourses, setCurUserCourses] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseToAdd, setCourseToAdd] = useState("");

  const getAllCourses = () => {
    axios
      .get("http://localhost:8000/api/get_all_courses/")
      .then((response) => {
        setCourses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const listOfCourses = Object.values(courses).map((course, i) => (
    <li key={i}>{course}</li>
  ));

  const currentSchedule = Object.values(curUserCourses).map((course, i) => (
    <li key={i}>{course}</li>
  ));

  const addUserCourse = (courseToAdd) => {
    axios
      .put("http://localhost:8000/api/put_user_course/", {
        data: courseToAdd,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_user_course/")
      .then((response) => {
        setCurUserCourses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [addUserCourse]);

  return (
    <div>
      <h1>Student Course Planning App</h1>
      <textarea
        placeholder="Please enter a course code"
        onChange={(e) => {
          setCourseToAdd(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addUserCourse(courseToAdd);
        }}
      >
        Click here to add this course
      </button>
      <h1>Current Schedule:</h1>
      <p>{currentSchedule}</p>
      <button onClick={getAllCourses}>Click here to get 10 courses</button>
      <h1>Top 10 Courses</h1>
      {listOfCourses}
    </div>
  );
}

export default HelloWorld;
