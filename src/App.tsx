import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { Welcome } from "./components/Welcome/Welcome";
import { Home } from "./components/Home/Home";
import { Game } from "./components/Game/Game";
import { JoinGame } from "./components/JoinGame/JoinGame";

export const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/join-game-friend" element={<JoinGame />} />
      </Routes>
    </div>
  );
};
