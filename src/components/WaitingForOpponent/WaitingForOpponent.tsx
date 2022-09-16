import React from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "../common/Header/Header";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux-toolkit/store";
import { socket } from "../../socket-io/socket";
import "./WaitingForOpponent.css";

export const WaitingForOpponent = () => {
  const { room_id } = useSelector((store: StoreState) => store.user);
  let navigate = useNavigate();

  socket.on("player_join", (data: any) => {
    navigate("/game");
  });

  return (
    <>
      <Header h1={"TIC TAC TOE"} h2={"Waiting for the opponent..."} />
      <h3 className="waitingForOpponent__h3">Code:</h3>
      <h3 className="waitingForOpponent__h3">{room_id}</h3>
      <div className="waitingForOpponent__progress">
        <LinearProgress
          color="primary"
          sx={{ width: "50vw", maxWidth: "300px" }}
        />
      </div>
      <h2 className="header__h2">
        Send the code to your friend and wait for him to join the game.
      </h2>
    </>
  );
};
