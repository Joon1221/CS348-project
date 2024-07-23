import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { getAllDept } from "../../hooks/getDeptInfo";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



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
  { field: "id", headerName: "id" },
  { field: "cID", headerName: "Course ID" },
  { field: "subCode", headerName: "Subject Code", width: 125 },
  { field: "catNo", headerName: "Catalog Number", width: 125 },
  { field: "cName", headerName: "Course Name", width: 500},
  // { field: "desc", headerName: "Desc"},
];


const Title = styled.h1`
text-align: center;
`;

const emptyArray:any[] = [];

export default function CourseList({ courses, getAllCourses }) {
  useEffect(() => {
    getAllCourses();
  }, [])

  const transformedCourses = courses.map((course, index) => ({
    id: index,
    cID: course[0],
    subCode: course[1],
    catNo: course[2],
    cName: course[3],
    // description: course[4],
  }))
  // console.log(transformedCourses);

  const [departments, setDepartments] = useState(emptyArray);
  const [catalogNumbers, setCatalogNumbers] = useState(emptyArray); // not using this since it depends on dept
  const [filteredCourses, setFilteredCourses] = useState(transformedCourses);

  useEffect(() => {
    setFilteredCourses(transformedCourses);
  }, [])
  
  // console.log(filteredCourses)
  // console.log(transformedCourses)
  
  
  // useEffect(() => {
  //   const filterSetup = async() => {
  //     const response = await getAllCourses();
  //     setSubCodeFilter([...new Set( courses.map(course => course[1])) ]);
  //     setCatNoFilter([...new Set( courses.map(course => course[2])) ]);
  //     setCNameFilter([...new Set( courses.map(course => course[3])) ]);
  //   };

  //   filterSetup();
  //   // getAllCourses();
  // }, []);

  const allSubCodes = [...new Set( courses.map(course => course[1])) ];
  const allCatNos = [...new Set( courses.map(course => course[2])) ];
  const allCNames = [...new Set( courses.map(course => course[3])) ];
  const allCourseCodes = [...new Set( courses.map(course => course[1].concat(course[2])))];
  
  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     const result = await getAllDept();
  //     setDepartments(result);
  //   };

  //   fetchDepartments();
  // }, []);

  // useEffect(() => {
  //   const fetchDeptCatalogNums = async () => {
  //     if (subCodeFilter.length != 0) {
  //       var result:any[] = [];
  //       for (const code of subCodeFilter) {
  //         const codeCatNos = await getAllDeptCourseCode(code);
  //         result = result.concat(codeCatNos)
  //       }
  //       setCatalogNumbers(result);
  //     }
  //   };

  //   fetchDeptCatalogNums();
  // }, [subCodeFilter]);

  // to call, handleFilter(trim(searchString).toUpperCase)
  const handleSearch = (searchString) => {
    console.log(searchString);
    var fCourses:any[] = [];

    searchString = searchString.toUpperCase();

    // if search string is a department, return all courses under that department
    if (allSubCodes.includes(searchString)) {
      console.log("dept search")
      fCourses = transformedCourses.filter((course) => course.subCode === searchString);
    } 

    // otherwise, search string is probably (1) a course code or (2) something in the course title
    else {
      // remove first instance of space in searchString, if it exists
      const tmpSearchString = searchString.replace(' ','');
      
      // case (1) --- code here is not optimized 
      if (allCourseCodes.includes(tmpSearchString)) {
        console.log("course code match")
        fCourses = transformedCourses.filter((course) => 
          course.subCode.concat(course.catNo) === tmpSearchString);
      }

      // case (2)
      else {
        console.log("course name search")
        fCourses = transformedCourses.filter((course) => 
          course.cName.toUpperCase().includes(searchString));
      }
    }

    // set filter accordingly
    setFilteredCourses(fCourses);
  }

  return (
      <>
          <>
          <Title>Search for courses</Title>

          {/* filters */}
          <form style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="search-bar"
              className="text"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch(event.target.value.trim());
                  return false;
                }
              }}
              onChange={(event) => {
                if (event.target.value === '') setFilteredCourses(transformedCourses);
              }}
              label="Search by department, course code, or course name"
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                width: 500,
                margin: "10px auto"
              }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </form>
          
          {/* main table */}
          <>
          <MainContainer>
            <DataGrid
              rows={filteredCourses}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              style={{ height: "100%" }}
            />
          </MainContainer>
          </>
        </>
      </>
  );
}
