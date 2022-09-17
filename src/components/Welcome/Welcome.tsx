import React from "react";
import { Header } from "../common/Header/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  let navigate = useNavigate();

  return (
    <>
      <Header
        h1="Play Tic-Tac-Toe!"
        h2="Play with your friends and people from all over the world for free!"
      />
      <Button
        onClick={() => navigate("/login")}
        type="button"
        variant="contained"
        size="medium"
        sx={{ width: "180px", margin: "20px auto 0" }}
      >
        Log In
      </Button>
      <Button
        onClick={() => navigate("/sign-up")}
        type="button"
        variant="contained"
        size="medium"
        sx={{ width: "180px", margin: "20px auto 0" }}
      >
        Sign Up
      </Button>
    </>
  );
};
