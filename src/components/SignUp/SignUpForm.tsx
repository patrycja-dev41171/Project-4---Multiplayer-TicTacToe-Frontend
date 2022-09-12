import React, { useState } from "react";
import { Button, IconButton, InputAdornment, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { signUpSchema } from "../../validations/signUpSchema";
import { StyledTextField } from "../common/StyledTextField";
import {apiUrl} from "../../utils/config/api";

import { User } from "types";

import "../common/styles/form.css";
import {useNavigate} from "react-router-dom";

interface InputNumber {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export const SignUpForm = () => {
  const [values, setValues] = useState<InputNumber>({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const ShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const ShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/sign-up`, {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if(result.message) {
        setError(result.message);
        setDisable(!disable)
      }
      if(result.status === 200){
        navigate('/login')
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          fullWidth
          label="Username"
          variant="outlined"
          type="text"
          size="small"
          margin="normal"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username ? String(errors.username?.message) : ""}
        />
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
          label="Confirm Email"
          variant="outlined"
          type="email"
          size="small"
          margin="normal"
          {...register("confirmEmail")}
          error={!!errors.confirmEmail}
          helperText={
            errors.confirmEmail ? String(errors.confirmEmail?.message) : ""
          }
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
        <StyledTextField
          fullWidth
          label="Confirm Password"
          type={values.showConfirmPassword ? "text" : "password"}
          variant="outlined"
          size="small"
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? "Password is incorrect." : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "var(--color3)" }}
                  aria-label="toggle password visibility"
                  onClick={ShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p className={`${disable ? "disable" : "form__p form__p--error"}`}>{error}</p>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ width: "180px", margin: "20px auto 0" }}
        >
          Sign Up
        </Button>
      </form>
      <p className="form__p">
        Already have an account?{" "}
        <Link color="#BFA893" href="/login">
          Login...
        </Link>
      </p>
    </div>
  );
};
