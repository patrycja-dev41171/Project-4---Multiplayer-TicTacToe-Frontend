import React from "react";
import { LoginForm } from "./LoginForm";
import { Header } from "../common/Header/Header";


export const Login = () => {
    return (
        <>
            <Header h1="Login" h2="Enter the data provided during registration." />
            <LoginForm />
        </>
    )
}