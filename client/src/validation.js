import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("Invalid email format.").required("Email is required.").matches(/^(?!.*@[^,]*,)/, "Email should ocntain @ symbol."),
  password: Yup.string().required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
});

export const schemaSignUp = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid email format.")
    .required("Email is required.")
    .matches(/^(?!.*@[^,]*,)/, "Email should contain @ symbol."),
  password: Yup.string().required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
  confirmPassword: Yup.string().required("Please re-type your password")
    .oneOf([Yup.ref('password'), null], 'Passwords doesn\'t match')
});

export default schema;