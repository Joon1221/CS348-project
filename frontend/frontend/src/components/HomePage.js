import React, { useState, useEffect } from "react";
import axios from "axios";

const listOfItems = (items) => {
  return Object.values(items).map((course, i) => <li key={i}>{course}</li>);
};

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

export default function HomePage() {
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

  const getUserCourses = () => {
    axios
      .get("http://localhost:8000/api/get_user_course/")
      .then((response) => {
        setCurUserCourses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return (
    <>
      <h1>Student Course Planning App</h1>
      <h3>Please enter a course code you would like to add to your schedule</h3>
      <textarea
        placeholder="Enter a course code"
        onChange={(e) => {
          setCourseToAdd(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addUserCourse(courseToAdd);
        }}
      >
        Add course
      </button>
      <h1>Current Schedule:</h1>
      <p>{listOfItems(curUserCourses)}</p>
      <button onClick={getAllCourses}>Get Top 10 Courses</button>
      <h1>Top 10 Courses</h1>
      <p>{listOfItems(courses)}</p>
    </>
  );
}
