import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import DeleteModal from "../../Shared/DeleteModal";
import Table from "../../Shared/Table";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default function DeleteCourse({
  userCourses,
  setView,
  deleteUserCourse,
}) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [open, setOpen] = useState(false);

  // Transform userCourses to add an id property
  const transformedCourses = userCourses.map((course, index) => ({
    id: index,
    course,
  }));

  const handleDelete = () => {
    const subject_code = selectedCourse.split(" ")[0];
    const catalog_number = selectedCourse.split(" ")[1];
    deleteUserCourse({ subject_code, catalog_number });
  };

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => setView("default")} style={{ color: "black" }}>
          <ArrowBack />
        </Button>
        <h2>Delete Course</h2>
      </Header>
      <Table
        rows={transformedCourses}
        setSelectedCourse={setSelectedCourse}
        setOpen={setOpen}
      />
      <DeleteModal
        text="Are you sure you want to stop taking"
        selectedCourse={selectedCourse}
        handleDelete={handleDelete}
        setSelectedCourse={setSelectedCourse}
        open={open}
        setOpen={setOpen}
      />
    </MainContainer>
  );
}
