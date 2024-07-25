import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { TextField, Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { getAllDeptCourseCode } from "../../hooks/getDeptInfo";

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-cell {
    white-space: normal !important;
    word-wrap: break-word !important;
    line-height: 2 !important;
    display: block;
  }
  .MuiDataGrid-cellContent {
    display: block;
    white-space: normal;
    word-wrap: break-word;
  }
  .MuiDataGrid-columnHeader {
    white-space: normal;
    word-wrap: break-word;
    display: block;
  }
  .MuiDataGrid-columnHeaderTitle {
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.2;
    text-align: left;
  }
`;

// column names
const columns = [
  { field: "id", headerName: "id" },
  { field: "courseCode", headerName: "Course Code", minWidth: 110, flex: 1 },
  { field: "secType", headerName: "Section Type", minWidth: 70, flex: 1 },
  // { field: "cOfferNo", headerName: "Course Offer #"},
  { field: "sectionNo", headerName: "Section Number", minWidth: 70, flex: 1 },
  // { field: "term", headerName: "Term" },
  { field: "startTime", headerName: "Start Time", minWidth: 70, flex: 1 },
  { field: "endTime", headerName: "End Time", minWidth: 70, flex: 1 },
  { field: "weekdays", headerName: "Weekdays", minWidth: 80, flex: 1.5 },
  { field: "curSize", headerName: "Enrolled", minWidth: 70, flex: 1 },
  { field: "totSize", headerName: "Cap Size", minWidth: 50, flex: 1 },
  // { field: "location", headerName: "Location" },

  // { field: "subCode", headerName: "Subject Code", width: 125 },
  // { field: "catNo", headerName: "Catalog Number", width: 125 },
  // { field: "cName", headerName: "Course Name", width: 500},
  // { field: "desc", headerName: "Desc"},
];

// for splitting course codes into subject code + catalog #
function splitCourseCode(code) {
  return code.match(/[A-Z]+|[0-9]+[A-Z]?/g);
}

export default function SectionList({ 
  sections,
  filteredSections,
  setFilteredSections,
}) {
  const [subjectCode, setSubjectCode] = useState(""); // eg. CS
  const [catalogNum, setCatalogNum] = useState(""); // 348
  const [catalogNumbers, setCatalogNumbers] = useState([]);
  const [noSections, setNoSections] = useState(false); 

  // Memoized department codes
  const allDeptCodes = useMemo(() => {
    return [...new Set(sections.map((section) => 
      splitCourseCode(section.courseCode)[0]))];
  }, [sections]);
  // console.log(allDeptCodes)

  useEffect(() => {
    const fetchDeptCatalogNums = async () => {
      if (subjectCode) {
        const result = await getAllDeptCourseCode(subjectCode);
        setCatalogNumbers(result);
      }
    };

    fetchDeptCatalogNums();
  }, [subjectCode]);

 // Handle filtering by courses
  const handleFilter = () => {
    const filtered = sections.filter((section) => {
      const code = splitCourseCode(section.courseCode);
      // console.log(code)
      return code[0] === subjectCode 
      && code[1] === catalogNum;
    });
    setFilteredSections(filtered);
    const noSect = (filtered.length === 0) ? true : false;
    setNoSections(noSect);
  };

  return (
    <MainContainer>
      <Header>
        <h2>View Sections by Course</h2>
      </Header>
      <ContentContainer>
      <SectionSearchContainer>
        <Autocomplete
          disablePortal
          options={allDeptCodes}
          style={{ width: "43%" }}
          renderInput={(params) => (
            <TextField {...params} label="Subject Code" />
          )}
          onChange={(event, newValue) => setSubjectCode(newValue)}
        />
        <Autocomplete
          disablePortal
          options={catalogNumbers}
          style={{ width: "43%" }}
          renderInput={(params) => (
            <TextField {...params} label="Catalog Number" />
          )}
          onChange={(event, newValue) => setCatalogNum(newValue)}
        />
        <Button
          variant="outlined"
          onClick={handleFilter} //TODO: bring this back in once sections working
          // style={{ marginTop: "20px" }}
        >
          Search
        </Button>
        </SectionSearchContainer>
        {noSections && 
          <Header>
            <h3>No sections offered this term!</h3> 
          </Header>}
        <div style={{ height: 500, width: "85%" }}>
        {filteredSections.length > 0 && 
        <StyledDataGrid
          rows={filteredSections} 
          columns={columns}
          columnVisibilityModel={{ id: false }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          style={{ height: "85%", width: "100%" }}
        />
        }
        </div>
      </ContentContainer>
    </MainContainer>
  );
}
