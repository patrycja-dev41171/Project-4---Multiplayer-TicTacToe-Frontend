import * as yup from "yup";

export const codeRoomSchema = yup
    .object()
    .shape({
        code: yup
            .string()
            .required("Enter code from friend.")
            .max(36, "Code should be 36 characters long."),
    })
    .required();