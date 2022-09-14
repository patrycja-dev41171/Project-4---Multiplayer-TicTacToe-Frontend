import React from "react";
import { HomeHeader } from "./components/HomeHeader";
import {HomeBtns} from "./components/HomeBtns";
import {HomeScoreboard} from "./components/HomeScoreboard";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-layout">
      <HomeHeader />
      <HomeBtns/>
      <HomeScoreboard/>
    </div>
  );
};
