import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .test(
      "password-strength",
      "Password must meet the following criteria:\n" +
        "- Contain at least one special character (@, $, !, %, *, ?, or &).\n" +
        "- Include at least two uppercase letters.\n" +
        "- Include at least two lowercase letters.\n" +
        "- Contain at least two numbers (0-9).\n" +
        "- Must be between 8 and 30 characters in length.",
      (value) => {
        // Define your custom password validation logic here
        const regex =
          /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:\D*\d){2})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
        return regex.test(value);
      }
    ),
});
