import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useUserCourses from "../../hooks/useUserCourses";
import useUserCoursesTaken from "../../hooks/useUserCoursesTaken";
import ManageSchedule from "./ManageScheduleComponents/ManageSchedule";
import CourseList from "./CourseList";
import CoursesTaken from "./CoursesTaken";
import SectionList from "./SectionList";
import Profile from "../Shared/Profile";
import { getAllCourses, getAllSections } from "../../hooks/getDeptInfo";

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 20px;
`;

const TabPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const fetchFromLocalStorage = (key, fetchFunction) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  } else {
    return fetchFunction().then((data) => {
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    });
  }
};

export default function StudTabs({ user }) {
  const { userCourses, addUserCourse, deleteUserCourse } = useUserCourses(
    user?.username
  );
  const { userCoursesTaken, addUserCourseTaken, deleteUserCourseTaken } =
    useUserCoursesTaken(user?.username);

  const [selectedTab, setSelectedTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  // Fetch courses from local storage or API
  const fetchCourses = useCallback(async () => {
    try {
      const result = await getAllCourses();
      const formattedCourses = result.map((course, index) => ({
        id: index,
        cID: course[0],
        courseCode: course[1] + course[2],
        cName: course[3],
      }));
      setCourses(formattedCourses);
      setFilteredCourses(formattedCourses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }, []);

  // Fetch sections from local storage or API
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  function getWeekdays(str) {
    var arr = [];
    for (let i = 0; i < 7; ++i) {
      if (str[i] === "Y") arr.push(weekdays[i]);
    }
    var newStr = "";
    if (arr.length === 0)
      newStr = "None"; // still display some text if weekday string is "NNNNNNN"
    else newStr = arr.join(', '); // otherwise, return comma-separated string of weekdays

    return newStr;
  }
  const fetchSections = useCallback(async () => {
    try {
      const result = await fetchFromLocalStorage("sections", getAllSections);
      // const result = await getAllSections();
      console.log(result)
      const formattedSections = result.map((section, index) => ({
        id: index,
        courseCode: section[11] + section[12],
        // subCode: section[11],
        // catNo: section[12],
        // cID: section[0],
        // cOfferNo: section[1],
        sectionNo: section[2],
        // term: section[3],
        startTime: section[4].substring(11, 16), // e.g. "2024-07-22T10:00:00" => "10:00"
        endTime: section[5].substring(11, 16), // e.g. "2024-07-22T11:20:00" => "11:20"
        weekdays: getWeekdays(section[6]),
        secType: section[7], // this is component type (LEC, TUT, LAB)
        curSize: section[8], // this is currently enrolled count
        totSize: section[9], // this is total cap size
        // location: section[10],                // location is always "None" D:
      }));
      setSections(formattedSections);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchSections();
  }, [fetchCourses, fetchSections]);

  return (
    <TabContainer>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleTabChange}
        style={{ width: "250px" }}
        sx={{ "&& .MuiTab-root": { alignItems: "baseline" } }}
      >
        <Tab label="Schedule" />
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
            deleteUserCourse={deleteUserCourse}
          />
        )}
        {selectedTab === 1 && (
          <CourseList
            courses={courses}
            filteredCourses={filteredCourses}
            setFilteredCourses={setFilteredCourses}
          />
        )}
        {selectedTab === 2 && (
          <CoursesTaken
            userCoursesTaken={userCoursesTaken}
            addUserCourseTaken={addUserCourseTaken}
            deleteUserCourseTaken={deleteUserCourseTaken}
          />
        )}
        {selectedTab === 3 && <SectionList 
          sections={sections} 
          filteredSections={filteredSections}
          setFilteredSections={setFilteredSections}/>
        }
        {selectedTab === 4 && <Profile user={user} />}
      </TabPanel>
    </TabContainer>
  );
}
