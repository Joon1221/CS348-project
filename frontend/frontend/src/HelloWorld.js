import React, { useState, useEffect } from "react";
import axios from "axios";

function HelloWorld() {
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState("");

  const getAllCourses = () => {
    axios
      .get("http://localhost:8000/api/hello-world/")
      .then((response) => {
        setCourses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <button onClick={getAllCourses}>Click here to get all courses</button>
      <h2>Courses</h2>
      {courses}
    </div>
  );
}

export default HelloWorld;
