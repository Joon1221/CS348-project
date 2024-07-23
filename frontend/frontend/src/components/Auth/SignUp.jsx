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
  width: "80%";
  height: 400px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const createUser = async ({ username, password, isProf }) => {
  try {
    const response = await axios.put("http://localhost:8000/api/signup_user/", {
      username: username,
      password: password,
      is_prof: isProf,
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data;
  }
};

export default function SignUp() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    errorMsg: "",
    error: false,
  });

  const handleSignUp = async () => {
    const isProf = role === 0 ? false : true;
    try {
      await createUser({ username, password, isProf });
      setUser({ username, password, isProf });
      navigate("/home");
    } catch (error) {
      setIsInvalid({
        errorMsg:
          error.message === "username_exists"
            ? "This user already has an account"
            : "ERROR creating account",
        error: true,
      });
    }
  };

  return (
    <MainContainer>
      <h1>Create Account</h1>
      <ContentContainer>
        <TextField
          error={isInvalid.error}
          variant="outlined"
          label="WATIAM"
          placeholder="Enter WATIAM username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <FormControl variant="outlined" style={{ marginTop: "15px" }}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
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
            error={isInvalid.error}
          />
        </FormControl>
        {isInvalid.error && (
          <p style={{ color: "red" }}>{isInvalid.errorMsg}</p>
        )}
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
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </ContentContainer>
    </MainContainer>
  );
}
