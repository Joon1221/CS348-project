import React, { useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Button,
  IconButton,
} from "@mui/material";
import EditStudent from "./EditStudent";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const MatEdit = () => {
  return (
    <FormControlLabel
      control={
        <IconButton>
          <Edit />
        </IconButton>
      }
    />
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "course", headerName: "Course", width: 130 },
  { field: "termCode", headerName: "TermCode", width: 130 },
  { field: "grade", headerName: "Grade", width: 130 },
];

// MOCK DATA
const rows = [
  { id: 1, username: "Snow", course: "Jon", termCode: 2024, grade: 89 },
  { id: 2, username: "Lannister", course: "Cersei", termCode: 2020, grade: 74 },
  { id: 3, username: "Lannister", course: "Jaime", termCode: 2009, grade: 45 },
];

export default function ProfStudInfo() {
  // const [selectedStudent, setSelectedStudent] = useState({});
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = (studentInfo) => {
  //   setSelectedStudent(studentInfo);
  //   setIsEditing(true);
  // };

  return (
    <>
      {/* {!isEditing && ( */}
      <MainContainer>
        <Header>
          <h2>History of Students</h2>
        </Header>
        <DataGrid
          checkboxSelection={false}
          disableMultipleRowSelection
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onCellClick={(e) => {
            // console.log(e.row)
            // handleEditClick(e.row);
          }}
          pageSizeOptions={[10, 20]}
          style={{ height: "85%" }}
        />
      </MainContainer>
      {/* )} */}
      {/* {isEditing && <EditStudent setIsEditing={setIsEditing} selectedStudent={selectedStudent} />} */}
    </>
  );
}
