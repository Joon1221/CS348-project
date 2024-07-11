import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { UserContext } from "../../context/UserContext";

const MainContainer = styled.div`
  width: 600px;
  height: 700px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const createUser = ({ username, password }) => {
  axios
    .put("http://localhost:8000/api/signup_user/", {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function SignUp() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    createUser({ username, password });
    setUser({ username });
    navigate("/home");
  };

  return (
    <MainContainer>
      <h1>Create Account</h1>
      <TextField
        variant="outlined"
        label="WATIAM"
        placeholder="Enter WATIAM username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <FormControl variant="outlined" style={{ marginTop: "15px" }}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(e)=> e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Enter password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl style={{ marginTop: "35px" }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value={0}>Student</MenuItem>
          <MenuItem value={1}>Professor</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        style={{ marginTop: "20px" }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </MainContainer>
  );
}
