import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { getAllDept } from "../../hooks/getDeptInfo";

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-cell {
    white-space: normal !important;
    word-wrap: break-word !important;
    line-height: 2 !important;
    display: block;
  }
  .MuiDataGrid-cellContent {
    display: block;
    white-space: normal;
    word-wrap: break-word;
  }
  .MuiDataGrid-columnHeader {
    white-space: normal;
    word-wrap: break-word;
    display: block;
  }
  .MuiDataGrid-columnHeaderTitle {
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.2;
    text-align: center;
  }
`;

const columns = [
  { field: "id", headerName: "ID" },
  { field: "cID", headerName: "Course ID", width: 115 },
  { field: "courseCode", headerName: "Course Code", width: 125 },
  {
    field: "cName",
    headerName: "Course Name",
    width: 400,
    renderCell: (params) => (
      <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        {params.value}
      </div>
    ),
  },
];

export default function CourseList({
  courses,
  filteredCourses,
  setFilteredCourses,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await getAllDept();
      setDepartments(result);
    };

    fetchDepartments();
  }, []);

  // Handle search input
  useEffect(() => {
    const handleSearch = () => {
      const searchedCourse = searchInput.replace(/\s/g, "").toUpperCase();
      const toUpperCase = (str) => str.toUpperCase();

      const isDeptSearch = departments.includes(searchedCourse);

      const filtered = courses.filter((course) => {
        const courseCode = toUpperCase(course.courseCode);
        const courseName = toUpperCase(course.cName);

        if (isDeptSearch) {
          return courseCode.startsWith(searchedCourse);
        } else {
          return (
            courseCode.includes(searchedCourse) ||
            courseName.includes(searchedCourse)
          );
        }
      });

      const sortedFilteredCourses = filtered.sort((a, b) =>
        a.courseCode.localeCompare(b.courseCode)
      );
      setFilteredCourses(sortedFilteredCourses);
    };

    handleSearch();
  }, [searchInput, courses, departments]);

  return (
    <MainContainer>
      <h1>Search for courses</h1>
      <TextField
        label="Search by department, course code, or course name"
        variant="outlined"
        placeholder="Search..."
        style={{ width: "50%", margin: "10px 0" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div style={{ height: 500, width: "85%" }}>
        <StyledDataGrid
          rows={filteredCourses}
          columns={columns}
          columnVisibilityModel={{ id: false }}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </div>
    </MainContainer>
  );
}
