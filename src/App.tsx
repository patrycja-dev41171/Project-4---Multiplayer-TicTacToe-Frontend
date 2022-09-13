import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { Welcome } from "./components/Welcome/Welcome";

export const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};
