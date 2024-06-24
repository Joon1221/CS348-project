import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MainContainer = styled.div`
  width: 600px;
  height: 700px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
`;

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
  const [isInputValid, setIsInputValid] = useState(true);

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
    <MainContainer>
      <Title>UWaterloo Student Course Planning App</Title>
      <TextField
        variant="outlined"
        placeholder="Type a course code you would like to add to your schedule"
        helperText={
          !isInputValid
            ? "Invalid input. Please try again and enter a valid input."
            : ""
        }
        error={!isInputValid}
        onChange={(e) => {
          setCourseToAdd(e.target.value);
          setIsInputValid(true);
        }}
        style={{ marginBottom: "15px" }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          if (courseToAdd.length !== 0 && courseToAdd !== null) {
            addUserCourse(courseToAdd);
          } else {
            setIsInputValid(false);
          }
        }}
      >
        Add Course
      </Button>
      <Title>Current Schedule</Title>
      <p>{curUserCourses && listOfItems(curUserCourses)}</p>
      <Button variant="outlined" onClick={getAllCourses}>
        Click to Get Top 10 Courses
      </Button>
      {courses.length > 0 && (
        <>
          <Title>Top 10 Courses</Title>
          <p>{listOfItems(courses)}</p>
        </>
      )}
    </MainContainer>
  );
}
