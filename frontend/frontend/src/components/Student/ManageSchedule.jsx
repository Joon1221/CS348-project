import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const listOfItems = (items) => {
  return items.map((course, i) => <li key={i}>{course}</li>);
};

export default function ManageSchedule({
  courseToAdd,
  setCourseToAdd,
  isInputValid,
  setIsInputValid,
  userCourses,
  addUserCourse,
}) {
  return (
    <>
    <h2>Add Course</h2>
      <TextField
        variant="outlined"
        placeholder="Type a course code you would like to add to your schedule"
        helperText={
          !isInputValid
            ? "Invalid input. Please try again and enter a valid input."
            : ""
        }
        error={!isInputValid}
        onChange={(e) => {
          setCourseToAdd(e.target.value);
          setIsInputValid(true);
        }}
        style={{ marginBottom: "15px" }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          if (courseToAdd.length !== 0 && courseToAdd !== null) {
            addUserCourse(courseToAdd);
          } else {
            setIsInputValid(false);
          }
        }}
      >
        Add Course
      </Button>
      <h2>Current Schedule</h2>
      {userCourses.length === 0 ? (
        <h3>No courses</h3>
      ) : (
        <ul>{listOfItems(userCourses)}</ul>
      )}
    </>
  );
}