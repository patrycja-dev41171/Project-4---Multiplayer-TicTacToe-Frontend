import { Routes, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiUrl } from "./utils/config/api";

import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setExpirationTime,
  setUser_id,
  setUsername,
} from "./redux-toolkit/features/user/user-slice";
import { useRefreshToken } from "./utils/refreshToken/useRefreshToken";

import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";
import { Game } from "./components/Game/Game";
import { JoinGame } from "./components/JoinGame/JoinGame";
import { WaitingForOpponent } from "./components/WaitingForOpponent/WaitingForOpponent";
import {
  LoginRoutes,
  OutLoginRoutes,
} from "./utils/protectedRoutes/ProtectedRoutes";

import "./App.css";

interface AccessToken {
  name: string;
  exp: number;
}

export const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route element={<OutLoginRoutes />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<LoginRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/join-game-friend" element={<JoinGame />} />
          <Route path="/join-game-waiting" element={<WaitingForOpponent />} />
        </Route>
      </Routes>
    </div>
  );
};
