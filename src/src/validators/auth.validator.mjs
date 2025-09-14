import { check } from "express-validator";
import stopValidate from "../middlewares/validate-request.mjs";

export const validateRegister = () => {
  return [
    check("email", "AM1001").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    check("firstname", "AM1002").trim().not().isEmpty(),
    check("lastname", "AM1003").trim().not().isEmpty(),
    check("phone", "AM1004").trim().not().isEmpty(),
    check("company", "AM1005").trim().not().isEmpty(),
    check("password", "AM1006").matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*.\-])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#$%^&*.\-]{10,}$/
    ),
    stopValidate,
  ];
};
