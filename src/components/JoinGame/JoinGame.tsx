import React, { useState } from "react";
import { Header } from "../common/Header/Header";
import { Button } from "@mui/material";
import { StyledTextField } from "../common/StyledTextField";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { codeRoomSchema } from "../../validations/codeRoomSchema";
import "./JoinGame.css";

type Code = {
  code: string;
};

export const JoinGame = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState(false);
  const [btn, setBtn] = useState(true);
  const [disable, setDisable] = useState(true);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Code>({
    resolver: yupResolver(codeRoomSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Code> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Header h1={"TIC TAC TOE"} h2={"Play with friends!"} />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ width: "180px", margin: "20px auto 0" }}
      >
        Start game
      </Button>
      {!btn ? null : (
        <Button
          onClick={() => {
            setForm(true);
            setBtn(false);
          }}
          type="submit"
          variant="contained"
          size="medium"
          sx={{ width: "180px", margin: "20px auto 0" }}
        >
          Join game
        </Button>
      )}

      {!form ? null : (
        <form className="joinGame__form" onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            fullWidth
            label="Code"
            variant="outlined"
            type="text"
            size="small"
            margin="normal"
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code ? String(errors.code?.message) : ""}
          />
          <p className={`${disable ? "disable" : "form__p form__p--error"}`}>
            {error}
          </p>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ width: "180px", margin: "20px auto 0" }}
          >
            Join game
          </Button>
        </form>
      )}
    </>
  );
};
