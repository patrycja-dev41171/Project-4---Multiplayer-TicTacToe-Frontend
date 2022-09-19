import React from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRoom_id } from "../../../redux-toolkit/features/user/user-slice";
import { StoreState } from "../../../redux-toolkit/store";
import { apiUrl } from "../../../utils/config/api";
import { socket } from "../../../socket-io/socket";
import "./HomeBtns.css";

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
      .then(async function (response: AxiosResponse) {
        if (response.request.status === 400) {
          console.log(JSON.parse(response.request.response).message);
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
