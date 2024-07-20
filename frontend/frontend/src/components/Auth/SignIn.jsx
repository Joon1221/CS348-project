import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
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

const Title = styled.h1`
  text-align: center;
`;

export default function SignIn() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    errorMsg: "",
    error: false,
  });

  const LoginUser = ({ username, password }) => {
    axios
      .get("http://localhost:8000/api/login_user/", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        const isProf = response.data.message == "student" ? false : true;
        setUser({ username, isProf });
        navigate("/home");
      })
      .catch((error) => {
        setIsInvalid({
          errorMsg:
            error.response.data.message === "incorrect_password"
              ? "Incorrect password"
              : "No account",
          error: true,
        });
      });
  };

  return (
    <MainContainer>
      <Title>UWaterloo Course Planning</Title>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <ContentContainer>
        <TextField
          variant="outlined"
          label="WATIAM"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setIsInvalid({
              errorMsg: "",
              error: false,
            });
          }}
          placeholder="Enter WATIAM username"
          error={isInvalid.error}
        />
        <FormControl variant="outlined" style={{ marginTop: "10px" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
              setIsInvalid({
                errorMsg: "",
                error: false,
              });
            }}
            error={isInvalid.error}
          />
        </FormControl>
        {isInvalid.error && (
          <p style={{ color: "red" }}>{isInvalid.errorMsg}</p>
        )}
        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={() => {
            LoginUser({ username, password });
          }}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          style={{ marginTop: "30px" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create an account
        </Button>
      </ContentContainer>
    </MainContainer>
  );
}
