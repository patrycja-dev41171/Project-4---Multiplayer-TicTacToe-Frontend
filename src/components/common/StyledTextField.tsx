import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField, {
  name: "MainStyledTextField",
})({
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px var(--color1) inset",
      WebkitTextFillColor: "var(--color5)",
      borderRadius: "5px",
      fontWeight: "600",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color5)",
  },
  "& .MuiInputBase-input": {
    color: "var(--color5)",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "600",
  },
  "& .MuiFormLabel-root": {
    fontSize: "13px",
    fontWeight: "500",
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "16px",
    fontWeight: "500",
  },
  "@media screen and (min-height: 1024px) and (min-width: 768px) and (orientation: portrait)":
    {
      "& .MuiInputBase-input": {
        padding: "10px 14px",
        fontSize: "16px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "16px",
      },
      "& .MuiInputLabel-shrink": {
        fontSize: "16px",
      },
    },
  "@media screen and (min-width: 1024px) and (min-height: 768px) and (orientation: landscape)":
    {
      "& .MuiInputBase-input": {
        padding: "10px 14px",
        fontSize: "16px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "16px",
      },
      "& .MuiInputLabel-shrink": {
        fontSize: "16px",
      },
    },
});
