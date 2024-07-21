import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Autocomplete, Button } from "@mui/material";
import { getAllDept } from "../../hooks/getDeptInfo";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";
import DeleteModal from "../Shared/DeleteModal";
import Table from "../Shared/Table";

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //background-color: darksalmon;
`;

const AddCourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 2rem;
  //background-color: #e1ffa0;
`;

// TODO: MOCK DATA
const rows = [
  { id: 1, course: "CS 348" },
  { id: 2, course: "MATH 115" },
];

export default function ManageCoursesTaught() {
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [departments, setDepartments] = useState([]);
  const [catalogNumbers, setCatalogNumbers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [open, setOpen] = useState(false);

  // TODO: On add, the changes should be reflexted immediately
  const handleAddCourse = () => {
    //addUserCourse({ subject_code: subjectCode, catalog_number: catalogNum });
    console.log("To add course taught");
  };

  // TODO: On delete, the changes should be reflexted immediately
  const handleDelete = () => {
    const subject_code = selectedCourse.split(" ")[0];
    const catalog_number = selectedCourse.split(" ")[1];
    console.log("To delete course taught", subject_code, catalog_number);
    // deleteUserCourse({ subject_code, catalog_number });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await getAllDept();
      setDepartments(result.sort());
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDeptCatalogNums = async () => {
      if (subjectCode) {
        const result = await getAllDeptCourseCode(subjectCode);
        setCatalogNumbers(result.sort());
      }
    };

    fetchDeptCatalogNums();
  }, [subjectCode]);

  return (
    <MainContainer>
      <Header>
        <h2>Manage Courses Taught</h2>
      </Header>
      <ContentContainer>
        <AddCourseContainer>
          <Autocomplete
            disablePortal
            options={departments}
            style={{ width: "43%" }}
            renderInput={(params) => (
              <TextField {...params} label="Subject Code" />
            )}
            onChange={(event, newValue) => setSubjectCode(newValue || "")}
            isOptionEqualToValue={(option, value) => option === value}
            onInputChange={(event, value, reason) => {
              if (reason === "clear") {
                setCatalogNum("");
                setCatalogNumbers([]);
              }
            }}
          />
          <Autocomplete
            disablePortal
            value={catalogNum}
            options={catalogNumbers}
            style={{ width: "43%" }}
            renderInput={(params) => (
              <TextField {...params} label="Catalog Number" />
            )}
            onChange={(event, newValue) => setCatalogNum(newValue || "")}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <Button
            variant="outlined"
            onClick={handleAddCourse}
            style={{ height: "100%" }}
          >
            Add Course
          </Button>
        </AddCourseContainer>
        <Table
          rows={rows}
          setSelectedCourse={setSelectedCourse}
          setOpen={setOpen}
        />
      </ContentContainer>
      <DeleteModal
        text="Are you sure you want to stop teaching"
        selectedCourse={selectedCourse}
        handleDelete={handleDelete}
        setSelectedCourse={setSelectedCourse}
        open={open}
        setOpen={setOpen}
      />
    </MainContainer>
  );
}
