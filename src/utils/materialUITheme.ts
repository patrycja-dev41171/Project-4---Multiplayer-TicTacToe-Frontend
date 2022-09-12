import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#402F21",
      contrastText: "rgba(217, 204, 197)",
    },
    secondary: {
      main: "#8C7158",
      contrastText: "#0d0d0d",
    },
    success: {
      main: "#BFA893",
      contrastText: "#0d0d0d",
    },
  },
});
