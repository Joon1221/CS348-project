import React, { useState, useContext } from "react";
import styled from "styled-components";
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
`

const Title = styled.h1`
  text-align: center;
`;

export default function SignIn() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        }}
        placeholder="Enter WATIAM username"
      />
      <FormControl variant="outlined" style={{ marginTop: "10px" }}>
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
          value={password}
          placeholder="Enter password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <Button
        variant="outlined"
        style={{ marginTop: "10px" }}
        onClick={() => {
          setUser({ username });
          navigate("/home");
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
