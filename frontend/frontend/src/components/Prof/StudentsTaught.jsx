import React, { useState, useEffect, useMemo } from "react";
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
import { getStudentsTaught } from "../../hooks/useProfCourses";

const MainContainer = styled.div`
  width: 85%;
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
  { field: "username", headerName: "Username", width: 120 },
  { field: "course", headerName: "Course", width: 100 },
  { field: "termCode", headerName: "TermCode", width: 100 },
  { field: "grade", headerName: "Grade", width: 100 },
  { field: "credit", headerName: "Credit", width: 100 },
];

export default function StudentsTaught({ username }) {
  // const [selectedStudent, setSelectedStudent] = useState({});
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = (studentInfo) => {
  //   setSelectedStudent(studentInfo);
  //   setIsEditing(true);
  // };

  const [students, setStudents] = useState([]);

  const transformedStudentsTaught = useMemo(
    () =>
      students.map((student, index) => ({
        id: index,
        username: student[0],
        course: student[1],
        termCode: student[2],
        grade: student[3],
        credit: student[4],
      })),
    [students]
  );

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await getStudentsTaught({ username });
        setStudents(result);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStudent();
  }, []);

  return (
    <>
      {/* {!isEditing && ( */}
      <MainContainer>
        <Header>
          <h2>Students Taught</h2>
        </Header>
        <DataGrid
          columnVisibilityModel={{ id: false }}
          checkboxSelection={false}
          disableMultipleRowSelection
          rows={transformedStudentsTaught}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          style={{ height: "85%", width: "100%" }}
        />
      </MainContainer>
      {/* )} */}
      {/* {isEditing && <EditStudent setIsEditing={setIsEditing} selectedStudent={selectedStudent} />} */}
    </>
  );
}
