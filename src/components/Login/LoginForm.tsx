import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import axios from "axios";

import { Button, IconButton, InputAdornment, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledTextField } from "../common/StyledTextField";
import { loginSchema } from "../../validations/loginSchema";
import { apiUrl } from "../../utils/config/api";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setExpirationTime,
  setUser_id,
  setUsername,
} from "../../redux-toolkit/features/user/user-slice";

import { Login } from "types";
import "../common/styles/form.css";

interface InputNumber {
  password: string;
  showPassword: boolean;
}

interface AccessToken {
  name: string;
  exp: number;
}

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);
  const [values, setValues] = useState<InputNumber>({
    password: "",
    showPassword: false,
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const ShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<Login> = async (data) => {
    await axios({
      method: "POST",
      url: `${apiUrl}/login`,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      responseType: "json",
    }).then(async function (response: any) {
      if (response.name === "AxiosError") {
        setError(response.response.data.message);
        setDisable(!disable);
      } else {
        const decoded = await jwtDecode<AccessToken>(response.data.accessToken);
        dispatch(setUser_id(response.data.user_id));
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setExpirationTime(decoded.exp));
        dispatch(setUsername(response.data.username));
        navigate("/home");
      }
    });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          size="small"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? String(errors.email?.message) : ""}
        />
        <StyledTextField
          fullWidth
          label="Password"
          variant="outlined"
          type={values.showPassword ? "text" : "password"}
          size="small"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? String(errors.password?.message) : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "var(--color3)" }}
                  aria-label="toggle password visibility"
                  onClick={ShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p className={`${error === "" ? "disable" : "form__p form__p--error"}`}>
          {error}
        </p>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ width: "180px", margin: "20px auto 0" }}
        >
          Log In
        </Button>
      </form>
      <p className="form__p">
        You dont have account?{" "}
        <Link color="#BFA893" href="/sign-up">
          Sign Up...
        </Link>
      </p>
    </div>
  );
};
