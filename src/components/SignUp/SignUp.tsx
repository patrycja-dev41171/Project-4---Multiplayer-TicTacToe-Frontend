import React from "react";
import { SignUpForm } from "./SignUpForm";
import { Header } from "../common/Header/Header";

export const SignUp = () => {
  return (
    <>
      <Header
        h1="Sign Up"
        h2="Please enter your personal information below to create a free account."
      />
      <SignUpForm />
    </>
  );
};
