import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function AddCourse({ addUserCourse, setView }) {
  const [courseToAdd, setCourseToAdd] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  // Transform userCourses to add an id property

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => setView("default")}>
          <ArrowBackIcon />
        </Button>
        <h2>Add Course</h2>
      </Header>
      <ContentContainer>
        <TextField
          variant="outlined"
          label="Course Number"
          placeholder="Enter course number"
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
      </ContentContainer>
    </MainContainer>
  );
}
