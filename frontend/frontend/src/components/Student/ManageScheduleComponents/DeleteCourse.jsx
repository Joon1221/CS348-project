import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Footer = styled.div`
  width: 100%;
  height: 10%;
  //background-color: green;
  display: flex;
  justify-content: center;
`;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "course", headerName: "Course Code", width: 150 },
];

export default function DeleteCourse({ userCourses, setView }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Transform userCourses to add an id property
  const transformedCourses = userCourses.map((course, index) => ({
    id: index,
    course,
  }));

  return (
    <MainContainer>
      <Header>
        <Button onClick={() => setView("default")} style={{ color: "black" }}>
          <ArrowBackIcon />
        </Button>
        <h2>Delete Course</h2>
      </Header>
      <DataGrid
        rows={transformedCourses}
        columns={columns}
        onCellClick={(e) => {
          setSelectedCourse(e.row.course);
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        style={{ height: "85%" }}
      />
      <Footer>
        <Button
          onClick={handleOpen}
          style={{
            color: "black",
            backgroundColor: "aliceblue",
            width: 200,
            height: 50,
          }}
          startIcon={<DeleteIcon />}
        >
          Delete course
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete {selectedCourse}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This action is irreversible
            </Typography>
            <Button
              onClick={() => {
                setSelectedCourse("");
                handleClose();
              }}
              style={{
                color: "black",
                backgroundColor: "aliceblue",
                width: 200,
                height: 50,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("DELETING", selectedCourse);
                handleClose();
              }}
              style={{
                color: "black",
                backgroundColor: "red",
                width: 200,
                height: 50,
              }}
              startIcon={<DeleteIcon />}
            >
              Delete course
            </Button>
          </Box>
        </Modal>
      </Footer>
    </MainContainer>
  );
}
