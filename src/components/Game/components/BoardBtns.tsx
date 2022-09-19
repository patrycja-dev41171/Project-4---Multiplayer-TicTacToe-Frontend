import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { Button } from "@mui/material";
import { setRoom_id } from "../../../redux-toolkit/features/user/user-slice";
import { StoreState } from "../../../redux-toolkit/store";
import { socket } from "../../../socket-io/socket";
import { apiUrl } from "../../../utils/config/api";

interface BoardBtnsProps {
  btn1: string;
  btn2: string;
  btn: {
    btn1: boolean;
    btn2: boolean;
  };
  points: {
    playerX: number;
    playerO: number;
  };
  player: string;
}

export const BoardBtns = (props: BoardBtnsProps) => {
  const { user_id, accessToken } = useSelector(
    (store: StoreState) => store.user
  );
  let navigate = useNavigate();

  const saveResult = async () => {
    let points = 0;
    if (props.player === "X") {
      points = props.points.playerX;
    } else {
      points = props.points.playerO;
    }
    await axios({
      method: "POST",
      url: `${apiUrl}/game/save-result`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        user_id: user_id,
        points: points,
      },
      withCredentials: true,
      responseType: "json",
    })
      .then(async function (response: AxiosResponse) {
        if (response.request.status === 400) {
            console.log(JSON.parse(response.request.response).message)
        } else {
          setRoom_id("");
          navigate("/home");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="board__btns">
      <Button
        disabled={props.btn.btn1}
        type="submit"
        variant="contained"
        size="medium"
        onClick={() => saveResult()}
      >
        {props.btn1}
      </Button>
      <Button
        disabled={props.btn.btn2}
        type="submit"
        variant="contained"
        size="medium"
        onClick={() => {
          setRoom_id("");
          socket.emit("user-disconnect");
          navigate("/home");
        }}
      >
        {props.btn2}
      </Button>
    </div>
  );
};
