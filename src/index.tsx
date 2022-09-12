import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ThemeProvider } from "@mui/material/styles";
import {mainTheme} from "./utils/materialUITheme";
import {BrowserRouter} from "react-router-dom";
import './utils/interceptors/axios';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);
