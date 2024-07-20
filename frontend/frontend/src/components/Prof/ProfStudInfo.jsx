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
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "grade",
    headerName: "Grade",
    type: "number",
    width: 50,
  },
  {
    field: "year",
    headerName: "Year",
    type: "Date",
    width: 100,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  // },
  // {
  //   field: "edit",
  //   headerName: "Edit",
  //   sortable: false,
  //   width: 140,
  //   renderCell: (params) => {
  //     return (
  //       <div style={{ cursor: "pointer" }}>
  //         <MatEdit index={params.row.id} />
  //       </div>
  //     );
  //   },
  // },
];

// MOCK DATA
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", year: 2024, grade: 88 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", year: 2020, grade: 74 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", year: 2009, grade: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", year: 2021, grade: 65 },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    year: 2019,
    grade: 89,
  },
  { id: 6, lastName: "Melisandre", firstName: "Kane", year: 2017, grade: 100 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", year: 2024, grade: 82 },
  { id: 8, lastName: "Frances", firstName: "Rossini", year: 2019, grade: 92 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", year: 2015, grade: 86 },
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
