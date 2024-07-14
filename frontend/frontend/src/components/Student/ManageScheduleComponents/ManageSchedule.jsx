import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";
import AddCourse from "./AddCourse";
import CurrentSchedule from "./CurrentSchedule";
import DeleteCourse from "./DeleteCourse";

const MainContainer = styled.div`
  /* align-items: center; */
  //background-color: pink;
  height: 100%;
  width: 100%;
`;

const ManageScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: pink;
  height: 100%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  height: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ScheduleOptionButton = ({ iconType, width, title, onClick }) => {
  const Icon = iconType;
  return (
    <Button
      style={{
        width: width ? width : "150px",
        height: "130px",
        color: "black",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClick}
    >
      <Icon
        children={iconType}
        style={{ marginBottom: "10px", fontSize: 50 }}
      />
      {title}
    </Button>
  );
};

export default function ManageSchedule({ userCourses, addUserCourse }) {
  const [view, setView] = useState("default");

  const renderView = () => {
    switch (view) {
      case "current":
        return <CurrentSchedule setView={setView} userCourses={userCourses} />;
      case "add":
        return <AddCourse setView={setView} addUserCourse={addUserCourse} />;
      case "delete":
        return <DeleteCourse setView={setView} userCourses={userCourses} />;
      default:
        return (
          <>
            <h2>Manage Schedule</h2>
            <ButtonContainer>
              <ScheduleOptionButton
                iconType={CalendarMonthIcon}
                title="Current Schedule"
                width="180px"
                onClick={() => setView("current")}
              />
              <ScheduleOptionButton
                iconType={AddIcon}
                title="Add Course"
                onClick={() => setView("add")}
              />
              <ScheduleOptionButton
                iconType={DeleteIcon}
                title="Delete Course"
                onClick={() => setView("delete")}
              />
            </ButtonContainer>
          </>
        );
    }
  };

  return (
    <MainContainer>
      <ManageScheduleContainer>{renderView()}</ManageScheduleContainer>
    </MainContainer>
  );
}
