import { check } from "express-validator";
import stopValidate from "../middlewares/validate-request.mjs";

export const validateSchedule = () => {
  return [
    check("company", "SC1001").trim().not().isEmpty(),
    check("auditName", "SC1002").trim().not().isEmpty(),
    check("auditType", "SC1003").trim().not().isEmpty(),
    check("dateTime", "SC1004")
      .trim()
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    check("duration", "SC1005")
      .trim()
      .not()
      .isEmpty()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    check("responsibleAudit", "SC1006").trim().not().isEmpty(),
    check("auditArea", "SC1007").trim().not().isEmpty(),
    check("objective", "SC1008").trim().not().isEmpty(),
    stopValidate,
  ];
};
