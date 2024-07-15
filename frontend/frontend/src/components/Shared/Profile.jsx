import React, { useState } from "react";
import styled from "styled-components";
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

export default function Profile({ username }) {
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <MainContainer>
      <h1>Profile</h1>
      <h3>Username: {username}</h3>
      <PasswordContainer>
        <h3>Password: </h3>
        <FormControl style={{ marginTop: "12px" }}>
          <Input
            id="outlined-adornment-password"
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
            value={password}
            placeholder="Enter password"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </PasswordContainer>
      <ButtonContainer>
        {isDisabled ? (
          <Button
            variant="contained"
            style={{ width: 150 }}
            onClick={() => {
              setIsDisabled(false);
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
            }}
          >
            Cancel
          </Button>
        )}
        {!isDisabled && (
          <Button
            variant="contained"
            style={{ width: 150 }}
            onClick={() => {
              setIsDisabled(true);
              setPassword(password);
            }}
          >
            Save Changes
          </Button>
        )}
      </ButtonContainer>
    </MainContainer>
  );
}
