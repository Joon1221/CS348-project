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
`;

const AddCourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export default function ManageCoursesTaught({
  profCoursesTaught,
  addProfCourseTaught,
  deleteProfCourseTaught,
}) {
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [departments, setDepartments] = useState([]);
  const [catalogNumbers, setCatalogNumbers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [open, setOpen] = useState(false);

  const transformedCourses = profCoursesTaught.map((course, index) => ({
    id: index,
    course,
  }));

  const handleAddCourse = () => {
    addProfCourseTaught({
      subject_code: subjectCode,
      catalog_number: catalogNum,
    });
  };

  const handleDelete = () => {
    const subject_code = selectedCourse.split(" ")[0];
    const catalog_number = selectedCourse.split(" ")[1];
    console.log("To delete course taught", subject_code, catalog_number);
    deleteProfCourseTaught({ subject_code, catalog_number });
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
            onChange={(event, newValue) => {
              setSubjectCode(newValue);
            }}
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
            onChange={(event, newValue) => setCatalogNum(newValue)}
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
          rows={transformedCourses}
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
