import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./utils/materialUITheme";
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import "./socket-io/socket";
import { App } from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
