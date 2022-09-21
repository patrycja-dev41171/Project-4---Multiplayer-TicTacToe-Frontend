import * as yup from "yup";

export const loginSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("Invalid email.")
            .required("Enter email.")
            .max(255, "Email should not have more than 255 characters."),
        password: yup
            .string()
            .min(8, "Password should be at least 8 characters long.")
            .max(255, "Password should not exceed 255 characters.")
            .required("Enter password."),
    })
    .required();