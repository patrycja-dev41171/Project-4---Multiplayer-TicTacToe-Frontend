import React, { useState } from "react";
import { Header } from "../common/Header/Header";
import { Button } from "@mui/material";
import { StyledTextField } from "../common/StyledTextField";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { codeRoomSchema } from "../../validations/codeRoomSchema";
import {useDispatch, useSelector} from "react-redux";
import { StoreState } from "../../redux-toolkit/store";
import { apiUrl } from "../../utils/config/api";
import { socket } from "../../socket-io/socket";
import { setRoom_id } from "../../redux-toolkit/features/user/user-slice";
import axios from "axios";
import "./JoinGame.css";

type Code = {
  code: string;
};

export const JoinGame = () => {
  const { user_id } = useSelector((store: StoreState) => store.user);

  const [error, setError] = useState("");
  const [form, setForm] = useState(false);
  const [btn, setBtn] = useState(true);
  const [disable, setDisable] = useState(true);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Code>({
    resolver: yupResolver(codeRoomSchema),
    mode: "onChange",
  });

  const startGame = async () => {
    await axios({
      method: "GET",
      url: `${apiUrl}/game/start/friend/${user_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      responseType: "json",
    })
      .catch(function (error) {
        setError(error.response.data.message);
        setDisable(!disable);
      })
      .then(function (response: any) {
        dispatch(setRoom_id(response.data.room_id));
        socket.emit("join_room", response.data.room_id);
        if (response.data) navigate("/join-game-waiting");
      });
  };

  const onSubmit: SubmitHandler<Code> = async (data) => {
    await axios({
      method: "POST",
      url: `${apiUrl}/game/join/friend/${user_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
      withCredentials: true,
      responseType: "json",
    })
        .catch(function (error) {
          setError(error.response.data.message);
          setDisable(!disable);
        })
        .then(function (response: any) {
          dispatch(setRoom_id(response.data.room_id));
          socket.emit("join_room", response.data.room_id);
          if (response.data) navigate("/game");
        });
  };

  return (
    <>
      <Header h1={"TIC TAC TOE"} h2={"Play with friends!"} />
      <Button
        onClick={() => startGame()}
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
