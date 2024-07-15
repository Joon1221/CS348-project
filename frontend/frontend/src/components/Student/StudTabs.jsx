import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useUserCourses from "../../hooks/useUserCourses";
import ManageSchedule from "./ManageScheduleComponents/ManageSchedule";
import CourseList from "./CourseList";
import CoursesTaken from "./CoursesTaken";
import SectionList from "./SectionList";
import Profile from "../Shared/Profile";

const TabContainer = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;
`;

const TabPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export default function StudTabs({ user }) {
  const { courses, getAllCourses, userCourses, addUserCourse } = useUserCourses(
    user?.username
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <TabContainer>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleTabChange}
        style={{ width: "225px" }}
        sx={{
          "&& .MuiTab-root": {
            alignItems: "baseline",
          },
        }}
      >
        <Tab label="Manage Schedule" />
        <Tab label="Courses" />
        <Tab label="Courses Taken" />
        <Tab label="Class Sections" />
        <Tab label="Profile" />
      </Tabs>
      <TabPanel>
        {selectedTab === 0 && (
          <ManageSchedule
            userCourses={userCourses}
            addUserCourse={addUserCourse}
          />
        )}
        {selectedTab === 1 && (
          <CourseList courses={courses} getAllCourses={getAllCourses} />
        )}
        {selectedTab === 2 && <CoursesTaken />}
        {selectedTab === 3 && <SectionList />}
        {selectedTab === 4 && <Profile username={user.username}/>}
      </TabPanel>
    </TabContainer>
  );
}
