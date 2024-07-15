import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { UserContext } from "../context/UserContext";
import StudTabs from "./Student/StudTabs";
import ProfTabs from "./Prof/ProfTabs";

const MainContainer = styled.div`
  width: 97%;
  height: 700px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderEnd = styled.div`
display: flex;
width: 15%;
flex-direction: row;
justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 20px;
`;

export default function HomePage() {
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [isProf, setIsProf] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <MainContainer>
      <Header>
        <Title>UWaterloo Course Planning</Title>
        <HeaderEnd>
          <p>Welcome, {user.username}</p>
          <Button
            variant="outlined"
            onClick={handleSignOut}
            style={{ width: "100px" }}
          >
            Sign Out
          </Button>
        </HeaderEnd>
      </Header>
      {isProf && <ProfTabs />}
      {!isProf && <StudTabs user={user} />}
    </MainContainer>
  );
}
