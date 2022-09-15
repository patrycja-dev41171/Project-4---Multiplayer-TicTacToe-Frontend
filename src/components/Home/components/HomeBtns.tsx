import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HomeBtns.css";
export const HomeBtns = () => {
  let navigate = useNavigate();

  return (
    <div className="home-layout__buttons">
      <Button
        onClick={() => navigate("/login")}
        type="button"
        variant="contained"
        size="medium"
      >
        Random User
      </Button>
      <h1>PLAY</h1>
      <Button
        onClick={() => navigate("/join-game-friend")}
        type="button"
        variant="contained"
        size="medium"
      >
        Friend
      </Button>
    </div>
  );
};
