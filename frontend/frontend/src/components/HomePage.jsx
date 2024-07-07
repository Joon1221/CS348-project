import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserContext } from "../context/UserContext";

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
  return items.map((course, i) => <li key={i}>{course}</li>);
};

const useUserCourses = (username) => {
  const [userCourses, setUserCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  const getUserCourses = useCallback(() => {
    axios
      .get("http://localhost:8000/api/get_user_course/", {
        params: { username },
      })
      .then((response) => {
        setUserCourses(response.data.message);
      })
      .catch((error) => {
        console.log(`Get User Courses Error: ${error}`);
      });
  }, [username]);

  const getAllCourses = () => {
    axios
      .get("http://localhost:8000/api/get_all_courses/")
      .then((response) => {
        setCourses(response.data.message);
      })
      .catch((error) => {
        console.log(`Get All Courses Error: ${error}`);
      });
  };

  const addUserCourse = (courseToAdd) => {
    axios
      .put("http://localhost:8000/api/put_user_course/", {
        data: courseToAdd,
        username: username,
      })
      .then((response) => {
        // console.log(response.data.message);
        getUserCourses();
      })
      .catch((error) => {
        console.log(`Add Course Error: ${error}`);
      });
  };

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return {
    userCourses,
    courses,
    getAllCourses,
    addUserCourse,
  };
};

export default function HomePage() {
  const { user, signOut } = useContext(UserContext);
  const { userCourses, courses, getAllCourses, addUserCourse } = useUserCourses(user?.username);
  const navigate = useNavigate();

  const [courseToAdd, setCourseToAdd] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <MainContainer>
      <Title>UWaterloo Student Course Planning App</Title>
      <Button
        variant="outlined"
        onClick={handleSignOut}
        style={{ marginBottom: "15px" }}
      >
        Sign Out
      </Button>
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
      {userCourses.length === 0 ? <h3>No courses</h3> : <ul>{listOfItems(userCourses)}</ul>}
      <Button variant="outlined" onClick={getAllCourses}>
        Click to Get Top 10 Courses
      </Button>
      {courses.length > 0 && (
        <>
          <Title>Top 10 Courses</Title>
          <ul>{listOfItems(courses)}</ul>
        </>
      )}
    </MainContainer>
  );
}
