import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  //background-color: aliceblue;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  //background-color: lightskyblue;
`;

const GradeContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 20%;
  /* height: fit-content; */
  //background-color: bisque;
`;

export default function EditStudent({ setIsEditing, selectedStudent }) {
  const firstName = selectedStudent.firstName;
  const lastName = selectedStudent.lastName;
  const [grade, setGrade] = useState(selectedStudent.grade);
  const [isInputValid, setIsInputValid] = useState(true);

  const handleValidGradeChange = (newGrade) => {
    if (!isNaN(newGrade) && newGrade >= 0 && newGrade <= 100) {
      setGrade(newGrade);
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };
  return (
    <MainContainer>
      <Header>
        <Button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <h2>Edit Student Information</h2>
      </Header>
      <Content>
        <p>
          Editing: {firstName} {lastName}
        </p>
        <p>Change grade: </p>
        <GradeContent>
          <TextField
            variant="outlined"
            value={grade}
            placeholder="Enter new grade"
            helperText={
              !isInputValid
                ? "Invalid input. Please try again and enter a valid input."
                : ""
            }
            error={!isInputValid}
            onChange={(e) => {
              handleValidGradeChange(e.target.value);
            }}
            style={{ marginBottom: "15px" }}
          />
          <IconButton onClick={() => setGrade("")} style={{ height: "50px" }}>
            <ClearIcon />
          </IconButton>
        </GradeContent>
        <Button
          variant="contained"
          onClick={() => {
            console.log("Call api to save grade changes");
          }}
          style={{ width: "20%", marginTop: "15px" }}
        >
          Save Changes
        </Button>
      </Content>
    </MainContainer>
  );
}
