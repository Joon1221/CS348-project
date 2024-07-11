import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfStudInfo from "./ProfStudInfo";
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
  padding: 2rem;
`;

export default function ProfTabs() {
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
            '&& .MuiTab-root': {
                alignItems: 'baseline'
            },
        }}
      >
        <Tab label="Current Students"  />
        <Tab label="Profile" />
      </Tabs>
      <TabPanel>
        {selectedTab === 0 && <ProfStudInfo/>}
        {selectedTab === 1 && <Profile/>}
      </TabPanel>
    </TabContainer>
  );
}
