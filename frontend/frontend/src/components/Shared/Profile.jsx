import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
`;

const PasswordContainer = styled.div`
  width: 25%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  width: 25%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const updatePassword = async ({ username, password }) => {
  try {
    const response = await axios.put(
      "http://localhost:8000/api/update_password/",
      {
        username: username,
        new_password: password,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default function Profile({ user }) {
  const username = user?.username;
  const password = user.password;
  const [newPassword, setNewPassword] = useState(password);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPassSuccess, setIsPassSucc] = useState(false);

  const handlePasswordChange = async () => {
    setIsDisabled(true);
    try {
      updatePassword({
        username,
        password: newPassword,
      });
      setIsPassSucc(true);
    } catch (error) {
      setIsPassSucc(false);
    }
  };

  return (
    <MainContainer>
      <h1>Profile</h1>
      <h3>Username: {user.username}</h3>
      <PasswordContainer>
        <h3>Password: </h3>
        <FormControl style={{ marginTop: "12px" }}>
          <Input
            type={showPassword ? "text" : "password"}
            disabled={isDisabled}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={newPassword}
            placeholder="Enter password"
            label="Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setIsPassSucc(false);
            }}
          />
        </FormControl>
      </PasswordContainer>
      {isPassSuccess && <p>Password succesfully updated</p>}
      <ButtonContainer>
        {isDisabled ? (
          <Button
            variant="contained"
            style={{ width: 150 }}
            onClick={() => {
              setIsDisabled(false);
              setIsPassSucc(false);
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={{ width: 150 }}
            onClick={() => {
              setIsDisabled(true);
              setNewPassword(password);
              setIsPassSucc(false);
            }}
          >
            Cancel
          </Button>
        )}
        {!isDisabled && (
          <Button
            variant="contained"
            style={{ width: 150 }}
            onClick={handlePasswordChange}
          >
            Save Changes
          </Button>
        )}
      </ButtonContainer>
    </MainContainer>
  );
}
