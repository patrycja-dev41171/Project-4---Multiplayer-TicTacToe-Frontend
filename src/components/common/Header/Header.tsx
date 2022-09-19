import React from "react";
import "./Header.css";

interface HeaderProps {
  h1: string;
  h2: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <header className="header">
      <img className="header__img" src="./images/logo-image.svg" alt="Logo" />
      <h1 className="header__h1">{props.h1}</h1>
      <h2 className="header__h2">{props.h2}</h2>
    </header>
  );
};
