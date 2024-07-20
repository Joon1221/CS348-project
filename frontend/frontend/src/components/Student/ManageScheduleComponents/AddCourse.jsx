import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllDept } from "../../../hooks/useUserCourses";
import { getAllDeptCourseCode } from "../../../hooks/useUserCourses";

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
  const [departments, setDepartments] = useState([]);
  const [catalogNumbers, setCatalogNumbers] = useState([]);

  const handleAddCourse = () => {
    addUserCourse({ subject_code: subjectCode, catalog_number: catalogNum });
    setView("default");
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await getAllDept();
      setDepartments(result);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDeptCatalogNums = async () => {
      if (subjectCode) {
        const result = await getAllDeptCourseCode(subjectCode);
        setCatalogNumbers(result);
      }
    };

    fetchDeptCatalogNums();
  }, [subjectCode]);

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => setView("default")}>
          <ArrowBackIcon />
        </Button>
        <h2>Add Course</h2>
      </Header>
      <ContentContainer>
        <Autocomplete
          disablePortal
          options={departments}
          renderInput={(params) => (
            <TextField {...params} label="Subject Code" />
          )}
          onChange={(event, newValue) => setSubjectCode(newValue)}
        />
        <Autocomplete
          disablePortal
          options={catalogNumbers}
          style={{ marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Catalog Number" />
          )}
          onChange={(event, newValue) => setCatalogNum(newValue)}
        />
        <Button
          variant="outlined"
          onClick={handleAddCourse}
          style={{ marginTop: "20px" }}
        >
          Add Course
        </Button>
      </ContentContainer>
    </MainContainer>
  );
}
