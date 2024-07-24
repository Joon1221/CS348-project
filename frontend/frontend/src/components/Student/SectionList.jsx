// <<<<<<< Updated upstream
// import React from "react";
// =======
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { getAllSections } from "../../hooks/getDeptInfo";
import { getAllDept } from "../../hooks/getDeptInfo";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// column names
const columns = [
  { field: "id", headerName: "id" },
  { field: "subCode", headerName: "Subject Code" },
  { field: "catNo", headerName: "Catalog #" },
  // { field: "cOfferNo", headerName: "Course Offer #"},
  { field: "sectionNo", headerName: "Section #" },
  // { field: "term", headerName: "Term" },
  { field: "startTime", headerName: "Start Time" },
  { field: "endTime", headerName: "End Time" },
  { field: "weekdays", headerName: "Weekdays" },
  { field: "secType", headerName: "Component Type" },
  { field: "curSize", headerName: "Enrolled" },
  { field: "totSize", headerName: "Cap Size" },
  // { field: "location", headerName: "Location" },


  // { field: "subCode", headerName: "Subject Code", width: 125 },
  // { field: "catNo", headerName: "Catalog Number", width: 125 },
  // { field: "cName", headerName: "Course Name", width: 500},
  // { field: "desc", headerName: "Desc"},
];

// some stuff for processing the weekday strings, which look like "YNYNYNN"
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekdays(str) {
  var arr = [];
  for (let i = 0; i < 7; ++i) {
    if (str[i] === "Y") arr.push(weekdays[i]);
  }

  var newStr = "";
  if (arr.length === 0) newStr = "None"; // still display some text if weekday string is "NNNNNNN"
  else newStr = arr.join();              // otherwise, return comma-separated string of weekdays

  return newStr;
}

export default function SectionList() {
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [departments, setDepartments] = useState([]);
  const [catalogNumbers, setCatalogNumbers] = useState([]);
  
  useEffect(() => {
    const fetchDepartments = async () => {
      const result = await getAllDept();
      setDepartments(result);
    };
    
    fetchDepartments();
  }, []);
  
  useEffect(() => {
    const fetchDeptCatalogNums = async () => {
      if (subjectCode) {
        const result = await getAllDeptCourseCode(subjectCode);
        setCatalogNumbers(result);
      }
    };
    
    fetchDeptCatalogNums();
  }, [subjectCode]);
  
  useEffect(() => {
    const fetchSections = async () => {
      // Check if we have the data in local storage
      const cachedSections = localStorage.getItem("sections");
      
      if (cachedSections) {
        // If data is found in local storage, use it
        setSections(JSON.parse(cachedSections));
      } else {
        // If not, fetch the data from the API
        const result = await getAllSections();
        setSections(result);
        // Cache the data in local storage
        localStorage.setItem("sections", JSON.stringify(result));
      }
    };
    
    fetchSections();
  }, []);
  
  console.log(sections)
  
  const transformedSections = sections.map((section, index) => ({
    id: index,
    subCode: section[11],
    catNo: section[12],
    // cID: section[0],
    // cOfferNo: section[1],
    sectionNo: section[2],
    // term: section[3],
    startTime: section[4].substring(11, 16), // e.g. "2024-07-22T10:00:00" => "10:00"
    endTime: section[5].substring(11, 16),   // e.g. "2024-07-22T11:20:00" => "11:20"
    weekdays: getWeekdays(section[6]),
    secType: section[7],                     // this is component type (LEC, TUT, LAB)
    curSize: section[8],                     // this is currently enrolled count
    totSize: section[9],                     // this is total cap size
    // location: section[10],                // location is always "None" D:
  }))

  // const handleFilter = () => {
  //   const fSections = transformedSections.filter((section) => 
  //     section.subCode === subjectCode && section.catNo === catalogNum
  //   );
  //   setFilteredSections(fSections);
  //   // addUserCourse({ subject_code: subjectCode, catalog_number: catalogNum });
  // };

  let check = false
  const getSections = () => {
    const fSections = transformedSections.filter((section) => 
      section.subCode === subjectCode && section.catNo === catalogNum
    );
    setFilteredSections(fSections);
    console.log(filteredSections)
    check = true;
    console.log(check)
  }
// >>>>>>> Stashed changes

// export default function SectionList({ sections }) {
  return (
    <MainContainer>
      <Header>
        <h2>View Sections by Course</h2>
      </Header>
      <ContentContainer>
        <Autocomplete
          disablePortal
          options={departments}
          renderInput={(params) => (
            <TextField {...params} label="Subject Code" />
          )}
          onChange={(event, newValue) => setSubjectCode(newValue)}
        />
        <Autocomplete
          disablePortal
          options={catalogNumbers}
          style={{ marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Catalog Number" />
          )}
          onChange={(event, newValue) => setCatalogNum(newValue)}
        />
        <Button
          variant="outlined"
          onClick={getSections}
          style={{ marginTop: "20px" }}
        >
          Search
        </Button>
      </ContentContainer>
      {/* {check &&  */}
      <ContentContainer>
        <DataGrid
          rows={transformedSections}
          columns={columns}
          columnVisibilityModel={{ id: false }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          style={{ marginTop: "30px" }} 
        />
      </ContentContainer>
      {/*  } */}
    </MainContainer>
  );
}
