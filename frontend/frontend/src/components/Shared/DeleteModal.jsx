import React from "react";
import styled from "styled-components";
import { Button, Box, Typography, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  // background-color: pink;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
`;

export default function DeleteModal({
  text,
  selectedCourse,
  handleDelete,
  setSelectedCourse,
  open,
  setOpen,
}) {
  const handleClose = () => setOpen(false);
  return (
    <Modal open={open} onClose={handleClose}>
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
          {text} {selectedCourse}?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This action is irreversible.
        </Typography>
        <ButtonContainer>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedCourse("");
              handleClose();
            }}
            style={{
              width: "45%",
              height: 50,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete();
              handleClose();
            }}
            style={{
              width: "45%",
              height: 50,
            }}
            startIcon={<DeleteIcon />}
          >
            Delete course
          </Button>
        </ButtonContainer>
      </Box>
    </Modal>
  );
}
