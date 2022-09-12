import React, { useState } from "react";
import { Button, IconButton, InputAdornment, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { signUpSchema } from "../../validations/signUpSchema";
import { StyledTextField } from "../common/StyledTextField";
import { User } from "types";

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
    console.log(data);
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
