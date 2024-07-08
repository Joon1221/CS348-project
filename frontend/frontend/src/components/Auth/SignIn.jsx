import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const MainContainer = styled.div`
  width: 600px;
  height: 700px;
  margin: 1rem;
  padding: 1rem;
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

  return (
    <MainContainer>
      <Title>UWaterloo Student Course Planning App</Title>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <TextField
        variant="outlined"
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Enter username"
      />
      <TextField
        variant="outlined"
        label="Password"
        placeholder="Enter password"
        type="password"
        style={{ marginTop: "10px" }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
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
    </MainContainer>
  );
}
