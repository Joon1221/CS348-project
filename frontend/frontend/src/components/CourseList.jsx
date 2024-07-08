import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
`;

const listOfItems = (items) => {
  return items.map((course, i) => <li key={i}>{course}</li>);
};

export default function CourseList({ courses, getAllCourses }) {
  return (
    <>
      <Button variant="outlined" onClick={getAllCourses}>
        Click to Get Top 10 Courses
      </Button>
      {courses.length > 0 && (
        <>
          <Title>Top 10 Courses</Title>
          <ul>{listOfItems(courses)}</ul>
        </>
      )}
    </>
  );
}