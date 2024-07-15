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
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [isInputValid, setIsInputValid] = useState(true);

  const handleAddCourse = () => {
    if (subjectCode.trim() === "" || catalogNum.trim() === "") {
      setIsInputValid(false);
      return;
    }

    const catalogNumInt = parseInt(catalogNum, 10);
    if (isNaN(catalogNumInt) || catalogNumInt <= 0) {
      setIsInputValid(false);
      return;
    }

    const courseToAdd = subjectCode.trim() + catalogNumInt;

    if (courseToAdd.length > 0) {
      addUserCourse(courseToAdd);
      setView("default");
    } else {
      setIsInputValid(false);
    }
  };

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
          label="Subject Code"
          placeholder="Enter subject code"
          helperText={
            !isInputValid
              ? "Invalid input. Please try again and enter a valid input."
              : ""
          }
          error={!isInputValid}
          onChange={(e) => {
            setSubjectCode(e.target.value);
            setIsInputValid(true);
          }}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          variant="outlined"
          label="Catalog Number"
          placeholder="Enter catalog number"
          helperText={
            !isInputValid
              ? "Invalid input. Please try again and enter a valid input."
              : ""
          }
          error={!isInputValid}
          onChange={(e) => {
            setCatalogNum(e.target.value);
            if (
              e.target.value.length > 0 &&
              (isNaN(e.target.value) || e.target.value <= 0)
            ) {
              setIsInputValid(false);
            } else {
              setIsInputValid(true);
            }
          }}
          style={{ marginBottom: "15px" }}
        />
        <Button variant="outlined" onClick={handleAddCourse}>
          Add Course
        </Button>
      </ContentContainer>
    </MainContainer>
  );
}
