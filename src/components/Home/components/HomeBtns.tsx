import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HomeBtns.css";
import axios from "axios";
import { apiUrl } from "../../../utils/config/api";
import { setRoom_id } from "../../../redux-toolkit/features/user/user-slice";
import { socket } from "../../../socket-io/socket";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux-toolkit/store";

export const HomeBtns = () => {
  const { user_id, accessToken } = useSelector(
    (store: StoreState) => store.user
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const startRandomGame = async () => {
    await axios({
      method: "GET",
      url: `${apiUrl}/game/start/random/${user_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      responseType: "json",
    })
      .then(async function (response: any) {
        if (response.name === "AxiosError") {
          console.log(response.response.data.message);
        } else {
          dispatch(setRoom_id(response.data.room_id));
          socket.emit("join_room", response.data.room_id);
          if (response.data.startGame === true) {
            navigate("/game");
          } else {
            navigate("/join-game-waiting");
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="home-layout__buttons">
      <Button
        onClick={() => startRandomGame()}
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
