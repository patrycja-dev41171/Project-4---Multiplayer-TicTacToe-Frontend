import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux-toolkit/store";
import axios, { AxiosResponse } from "axios";
import {
  setGames,
  setPoints,
  setScoreboard,
  setScoreboard_Place,
} from "../../redux-toolkit/features/user/user-slice";
import { HomeHeader } from "./components/HomeHeader";
import { HomeBtns } from "./components/HomeBtns";
import { HomeScoreboard } from "./components/HomeScoreboard";
import { apiUrl } from "../../utils/config/api";
import "./Home.css";

export const Home = () => {
  const { user_id, accessToken } = useSelector(
    (store: StoreState) => store.user
  );
  const dispatch = useDispatch();

  const getScoreboard = async () => {
    await axios({
      method: "GET",
      url: `${apiUrl}/home/data/${user_id}`,
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
          dispatch(setGames(response.data.number_of_games));
          dispatch(setScoreboard_Place(response.data.place));
          dispatch(setScoreboard(response.data.scoreboard));
          dispatch(setPoints(response.data.points));
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    if (accessToken !== "") {
      getScoreboard().catch((err) => {
        console.log(err);
      });
    }
  }, [accessToken]);

  return (
    <div className="home-layout">
      <HomeHeader />
      <HomeBtns />
      <HomeScoreboard />
    </div>
  );
};
