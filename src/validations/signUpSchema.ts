import * as yup from "yup";

export const signUpSchema = yup
    .object()
    .shape({
        username: yup
            .string()
            .required("Enter username.")
            .min(5, "Username should be at least 5 characters long.")
            .max(30, "Username should not exceed 30 characters."),
        email: yup
            .string()
            .email("Invalid email.")
            .required("Enter email.")
            .max(255, "Username should be at least 3 characters long."),
        confirmEmail: yup.string().required("Enter email.").oneOf([yup.ref("email"), null]),
        password: yup
            .string()
            .min(8, "Password should be at least 8 characters long.")
            .max(255, "Password should not exceed 255 characters.")
            .required("Enter password."),
        confirmPassword: yup.string().required("Enter password.").oneOf([yup.ref("password"), null]),
    })
    .required();