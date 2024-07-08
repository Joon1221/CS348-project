import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { UserContext } from "../context/UserContext";
import ManageSchedule from "./ManageSchedule";
import CourseList from "./CourseList";
import useUserCourses from "../hooks/useUserCourses";

const MainContainer = styled.div`
  width: 1000px;
  height: 700px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;
`;

const TabPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export default function HomePage() {
  const { user, signOut } = useContext(UserContext);
  const { userCourses, courses, getAllCourses, addUserCourse } = useUserCourses(
    user?.username
  );
  const navigate = useNavigate();

  const [courseToAdd, setCourseToAdd] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <MainContainer>
      <Title>UWaterloo Student Course Planning App</Title>
      <Button
        variant="outlined"
        onClick={handleSignOut}
        style={{ marginTop: "15px" }}
      >
        Sign Out
      </Button>
      <TabContainer>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          style={{ width: 300, textAlign: "left" }}
        >
          <Tab label="Manage Schedule" />
          <Tab label="View Course List" />
        </Tabs>
        <TabPanel>
          {selectedTab === 0 && (
            <ManageSchedule
              courseToAdd={courseToAdd}
              setCourseToAdd={setCourseToAdd}
              isInputValid={isInputValid}
              setIsInputValid={setIsInputValid}
              userCourses={userCourses}
              addUserCourse={addUserCourse}
            />
          )}
          {selectedTab === 1 && (
            <CourseList courses={courses} getAllCourses={getAllCourses} />
          )}
        </TabPanel>
      </TabContainer>
    </MainContainer>
  );
}
