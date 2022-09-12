import React, { useState } from "react";
import { Button, IconButton, InputAdornment, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { StyledTextField } from "../common/StyledTextField";
import {loginSchema} from "../../validations/loginSchema";
import { Login } from "types";

import '../common/styles/form.css';
import {apiUrl} from "../../utils/config/api";
import {useNavigate} from "react-router-dom";

interface InputNumber {
    password: string;
    showPassword: boolean;
}

export const LoginForm = () => {
    const [values, setValues] = useState<InputNumber>({
        password: "",
        showPassword: false,
    });
    const [error, setError] = useState("");
    const [disable, setDisable] = useState(true);

    let navigate = useNavigate();

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
        try {
            const res = await fetch(`${apiUrl}/login`, {
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
                navigate('/home')
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
                <p className={`${disable ? "disable" : "form__p form__p--error"}`}>{error}</p>
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
