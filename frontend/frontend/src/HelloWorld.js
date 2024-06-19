import React, { useState, useEffect } from "react";
import axios from "axios";

function HelloWorld() {
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hello-world/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Student Course Planning App</h1>
      <button onClick={() => console.info("Adding MATH 135")}>
        Click here to add MATH 135
      </button>
      <button onClick={getAllCourses}>Click here to get 10 courses</button>
      <h2>Top 10 Courses</h2>
      {listOfCourses}
    </div>
  );
}

export default HelloWorld;
