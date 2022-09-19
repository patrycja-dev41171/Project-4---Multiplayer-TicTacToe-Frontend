import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux-toolkit/store";
import { apiUrl } from "../../../utils/config/api";

interface BoardHeaderProps {
  playerX: number;
  playerO: number;
}

export const BoardHeader = (props: BoardHeaderProps) => {
  const { room_id, accessToken, user_id } = useSelector(
    (store: StoreState) => store.user
  );
  const [opponentName, setOpponentName] = useState("");

  const getOpponent = async () => {
    await axios({
      method: "GET",
      url: `${apiUrl}/game/get-opponent/${room_id}/${user_id}`,
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
          setOpponentName(response.data.opponentName);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getOpponent();
  }, []);

  return (
    <>
      <h1 className="board__h1">TIC TAC TOE</h1>
      <h2 className="board__h2">Game status: in progress.</h2>
      <div className="board__info">
        <p>Opponent: {opponentName}</p>
        <p>POINTS</p>
        <p>Player X: {props.playerX}</p>
        <p>Player O: {props.playerO}</p>
      </div>
    </>
  );
};
