import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Title = styled.h1`
  text-align: center;
`;

// const listOfItems = (items) => {
//   return items.map((course, i) => <li key={i}>{course}</li>);
// };

export default function CourseList({ courses, getAllCourses }) {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  return (
    <>
      <Button variant="outlined" onClick={getAllCourses}>
        Click to Get Top 10 Courses
      </Button>
      {courses.length > 0 && (
        <>
          <Title>Top 10 Courses</Title>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={courses}
            onChange={(event, newValue) => {
              if (newValue.length === 0) setFilteredCourses(courses);
              else setFilteredCourses(newValue);
            }}
            // getOptionLabel={(option) => option.title}
            // defaultValue={[courses[13]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Department"
                placeholder="E.g. MATH"
              />
            )}
          />
          <>
            {filteredCourses.map((courses) => (
              <div key={courses}>
                <p>{courses}</p>
              </div>
            ))}
          </>
        </>
      )}
    </>
  );
}
