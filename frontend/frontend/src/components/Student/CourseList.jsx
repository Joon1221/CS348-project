import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';

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
  { field: "course_id", headerName: "Course ID" },
  { field: "subject_code", headerName: "Subject Code", width: 125 },
  { field: "catalog_number", headerName: "Catalog Number", width: 125 },
  { field: "course_name", headerName: "Course Name", width: 500},
  { field: "desc", headerName: "Desc"},
];


const Title = styled.h1`
  text-align: center;
`;

// const listOfItems = (items) => {
//   return items.map((course, i) => <li key={i}>{course}</li>);
// };


export default function CourseList({ courses, getAllCourses }) {
  const transformedCourses = courses.map((course, index) => ({
    id: index,
    course_id: course[0],
    subject_code: course[1],
    catalog_number: course[2],
    course_name: course[3],
    description: course[4],
  }))

  const [filteredCourses, setFilteredCourses] = useState(transformedCourses);

  return (
    <>
      <Button variant="outlined" onClick={getAllCourses}>
        Click to Get Top 10 Courses
      </Button>
      {courses.length > 0 && 
      (
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
              options={[...new Set( filteredCourses.map(course => course.subject_code)) ]}
              onChange={(event, newValue) => {
                setFilteredCourses(transformedCourses.filter((course) => {
                  return (
                    newValue.length === 0 || newValue.includes(course.subject_code)
                  );
                }));
              }}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[courses[13]]}
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
              options={[...new Set( filteredCourses.map(course => course.catalog_number)) ]}
              onChange={(event, newValue) => {
                setFilteredCourses(transformedCourses.filter((course) => {
                  return (
                    newValue.length === 0 || newValue.includes(course.catalog_number)
                  );
                }));
              }}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[courses[13]]}
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
              options={[...new Set( filteredCourses.map(course => course.course_name)) ]}
              onChange={(event, newValue) => {
                setFilteredCourses(transformedCourses.filter((course) => {
                  return (
                    newValue.length === 0 || newValue.includes(course.course_name)
                  );
                }));
              }}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[courses[13]]}
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
          </>
        </>
      )}
    </>
  );
}
