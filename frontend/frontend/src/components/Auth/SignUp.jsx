import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
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
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        label="Password"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{ marginTop: "15px" }}
      />
      <Button
        variant="outlined"
        style={{ marginTop: "10px" }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </MainContainer>
  );
}
