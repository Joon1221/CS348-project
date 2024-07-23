import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Profile from "../Shared/Profile";
import ManageCoursesTaught from "./ManageCoursesTaught";
import StudentsTaught from "./StudentsTaught";
import useProfCourse from "../../hooks/useProfCourses";

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

export default function ProfTabs({ user }) {
  const { profCoursesTaught, addProfCourseTaught, deleteProfCourseTaught } =
    useProfCourse(user?.username);
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
        style={{ width: "250px" }}
        sx={{
          "&& .MuiTab-root": {
            alignItems: "baseline",
          },
        }}
      >
        <Tab label="Students" />
        <Tab label="Courses" />
        <Tab label="Profile" />
      </Tabs>
      <TabPanel>
        {selectedTab === 0 && <StudentsTaught username={user?.username} />}
        {selectedTab === 1 && (
          <ManageCoursesTaught
            profCoursesTaught={profCoursesTaught}
            addProfCourseTaught={addProfCourseTaught}
            deleteProfCourseTaught={deleteProfCourseTaught}
          />
        )}
        {selectedTab === 2 && <Profile user={user} />}
      </TabPanel>
    </TabContainer>
  );
}
