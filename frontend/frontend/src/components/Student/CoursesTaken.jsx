import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { 
  TextField, 
  Autocomplete, 
  Button, 
  InputLabel, 
  MenuItem, 
  FormControl,
  FormControlLabel, 
  IconButton,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { getAllDept } from "../../hooks/getDeptInfo";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";
import DeleteModal from "../Shared/DeleteModal";

const MainContainer = styled.div`
  width: 85%;
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

const MatEdit = () => {
  return (
    <FormControlLabel
      control={
        <IconButton>
          <Delete />
        </IconButton>
      }
    />
  );
};

const columns = [
  { field: "id", headerName: "ID" },
  { field: "subCode", headerName: "Department" }, 
  { field: "catNo", headerName: "Catalog #" }, // rename later? idk lol
  { field: "term", headerName: "Term" },
  { field: "grade", headerName: "Grade" },
  { field: "credit", headerName: "Credit" },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return (
        <div style={{ cursor: "pointer" }}>
          <MatEdit index={params.row.id} />
        </div>
      );
    },
  },
];

export default function CoursesTaken({
  userCoursesTaken,
  addUserCourseTaken,
  deleteUserCourseTaken,
}) {
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [departments, setDepartments] = useState([]);
  const [catalogNumbers, setCatalogNumbers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [term, setTerm] = useState("");
  const [credits, setCredits] = useState(0.5);
  const [average, setAverage] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  const transformedCourses = userCoursesTaken.map((course, index) => ({
    id: index,
    subCode: course[0],
    catNo: course[1],
    term: course[2],
    grade: course[3],
    credit: course[4],
  }));

  const handleAddCourse = () => {
    addUserCourseTaken({
      subject_code: subjectCode,
      catalog_number: catalogNum,
      term_code: term,
      grade: parseInt(grade,10),
      credit: credits,
    });
    console.log(transformedCourses)
  };

  const handleDelete = () => {
    const subject_code = selectedCourse[0];
    const catalog_number = selectedCourse[1];
    deleteUserCourseTaken({ subject_code, catalog_number });
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

  // functions for cumulative values
  const getSum = arr => arr.reduce((a,b) => a + b);
  const getAverage = arr => getSum(arr) / arr.length;

  // update cumulative values every time user's courses taken change
  useEffect(() => {
    console.log(transformedCourses)
    if (transformedCourses.length === 0) {
      setAverage(0);
      setCredits(0);
    }
    else {
      const allGrades = transformedCourses.map((course) => course.grade);
      setAverage(getAverage(allGrades).toFixed(2));
      const allCredits = transformedCourses.map((course) => course.credit);
      setTotalCredits(getSum(allCredits));
    }
  }, [transformedCourses]);

  return (
    <MainContainer>
      <Header>
        <h2>Manage Courses Taken</h2>
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
          <TextField
            variant="outlined"
            label="Grade"
            value={grade}
            inputProps={{ maxLength: 3 }}
            onChange={(e) => {
              setGrade(e.target.value);
              // setIsInvalid({
              //   errorMsg: "",
              //   error: false,
              // });
            }}
            placeholder="Grade"
            // error={isInvalid.error}
          />
          <TextField
            variant="outlined"
            label="Term"
            value={term}
            inputProps={{ maxLength: 4 }}
            onChange={(e) => {
              setTerm(e.target.value);
              // setIsInvalid({
              //   errorMsg: "",
              //   error: false,
              // });
            }}
            placeholder="Term"
            // error={isInvalid.error}
          />
          <FormControl sx={{minWidth: 90}}>
            <InputLabel id="creds">Credits</InputLabel>
            <Select
              labelId="credOptionsLabel"
              id="credOptions"
              value={credits}
              label="Credits"
              onChange={(e) => { setCredits(e.target.value); }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={0.25}>0.25</MenuItem>
              <MenuItem value={0.5}>0.5</MenuItem>
              <MenuItem value={0.75}>0.75</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleAddCourse}
            style={{ height: "56px" }}
          >
            Add Course
          </Button>
        </AddCourseContainer>
        <DataGrid
          columnVisibilityModel={{ id: false }}
          rows={transformedCourses}
          columns={columns}
          onCellClick={(e) => {
            const courseCode = [Object.values(e.row)[1], Object.values(e.row)[2]]
            setSelectedCourse(courseCode);
            setOpen(true);
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          disableMultipleRowSelection
          style={{ height: "85%", width: "100%" }}
        />
      </ContentContainer>
      <DeleteModal
        text="Are you sure you want to delete this course"
        selectedCourse={selectedCourse}
        handleDelete={handleDelete}
        setSelectedCourse={setSelectedCourse}
        open={open}
        setOpen={setOpen}
      />
      <ContentContainer>
      <Header>
        <h3>Cumulative average: {average}</h3> 
      </Header>  
      <Header>
        <h3>Total credits: {totalCredits}</h3>
      </Header>
      </ContentContainer>
    </MainContainer>
  );
}
