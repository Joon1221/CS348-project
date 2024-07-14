import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "course", headerName: "Course Code", width: 150 },
];

export default function CurrentSchedule({ userCourses, setView }) {
  const transformedCourses = userCourses.map((course, index) => ({
    id: index,
    course,
  }));

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => setView("default")}>
          <ArrowBackIcon />
        </Button>
        <h2>Current Courses</h2>
      </Header>
      <DataGrid
        rows={transformedCourses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        style={{ height: "85%" }}
      />
    </MainContainer>
  );
}
