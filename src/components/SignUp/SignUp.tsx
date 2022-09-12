import React from "react";
import { SignUpForm } from "./SignUpForm";
import "./SignUp.css";

export const SignUp = () => {
  return (
    <>
      <header className="header">
        <img className="header__img" src="./images/logo-image.svg" alt="Logo" />
        <h1 className="header__h1">Sign Up</h1>
        <h2 className="header__h2">
          Please enter your personal information below to create a free account.
        </h2>
      </header>
      <SignUpForm />
    </>
  );
};
