import { request, response } from "express";
import { validationResult } from "express-validator";

const stopValidate = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mapped = errors.mapped();
    const keys = Object.keys(mapped);

    return res.status(400).json({
      status: false,
      data: null,
      error: {
        code: mapped[keys[0]].msg,
        message: "Error request",
        description: "Los datos de la petición son incorrectos",
      },
    });
  }
  next();
};

export default stopValidate;
