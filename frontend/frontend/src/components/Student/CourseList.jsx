import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { getAllDept } from "../../hooks/getDeptInfo";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";


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

// const listOfItems = (items) => {
//   return items.map((course, i) => <li key={i}>{course}</li>);
// };


export default function CourseList({ courses, getAllCourses }) {
  useEffect(() => {
    getAllCourses();
  }, [])

  // console.log(courses);

  const allSubCodes = [...new Set( courses.map(course => course[1])) ];
  const allCatNos = [...new Set( courses.map(course => course[2])) ];
  const allCNames = [...new Set( courses.map(course => course[3])) ];
  const [departments, setDepartments] = useState(emptyArray);
  const [catalogNumbers, setCatalogNumbers] = useState(emptyArray);
  const [subCodeFilter, setSubCodeFilter] = useState(allSubCodes);
  const [catNoFilter, setCatNoFilter] = useState(allCatNos);
  const [cNameFilter, setCNameFilter] = useState(allCNames);

  
  
  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await getAllDept();
      setDepartments(result);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDeptCatalogNums = async () => {
      if (subCodeFilter.length != 0) {
        var result:any[] = [];
        for (const code of subCodeFilter) {
          const codeCatNos = await getAllDeptCourseCode(code);
          result = result.concat(codeCatNos)
        }
        setCatalogNumbers(result);
      }
    };

    fetchDeptCatalogNums();
  }, [subCodeFilter]);

  const transformedCourses = courses.map((course, index) => ({
    id: index,
    cID: course[0],
    subCode: course[1],
    catNo: course[2],
    cName: course[3],
    // description: course[4],
  }))

  const filteredCourses = transformedCourses.filter((course) =>
    subCodeFilter.includes(course.subCode) &&
    catNoFilter.includes(course.catNo) &&
    cNameFilter.includes(course.cName)
  );

  return (
      <>
        <Title>Top 10 Courses</Title>

        {/* filters */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-start" // or center idk
          spacing={{ xs: 1, sm: 2}}
        >
          <Autocomplete
            multiple
            limitTags={5}
            id="subject-code"
            sx={{ width: 250 }}
            options={departments}
            onChange={(event, newValue) => {
              // console.log(courses)
              if (newValue.length === 0) setSubCodeFilter(allSubCodes);
              else setSubCodeFilter(newValue);
              }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Subject code"
                placeholder="E.g. CO"
              />
            )}
          />
          <Autocomplete
            multiple
            limitTags={5}
            id="catalog-number"
            sx={{ width: 200 }}
            options={catalogNumbers}
            onChange={(event, newValue) => {
              if (newValue.length === 0) setCatNoFilter(allCatNos);
              else setCatNoFilter(newValue);
              }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Catalog number"
                placeholder="E.g. 442"
              />
            )}
          />
          <Autocomplete
            multiple
            limitTags={1}
            id="course-name"
            sx={{ width: 400 }}
            options={allCNames}
            onChange={(event, newValue) => {
              if (newValue.length === 0) setCNameFilter(allCNames);
              else setCNameFilter(newValue);}}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Course name"
                placeholder="E.g. Graph Theory"
              />
            )}
          />
        </Stack>
        
        {/* main table */}
        <>
        {courses.length > 0 &&
        <MainContainer>
          <DataGrid
            rows={filteredCourses}
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
        }
        </>
      </>
  );
}
