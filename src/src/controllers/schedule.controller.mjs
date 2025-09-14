import { request, response } from "express";

import CustomError from "../config/errors.mjs";
import ScheduleModel from "../database/models/inspectia/schedule.model.mjs";

class ScheduleController {
  static #handleError(error, res = response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: false,
        data: null,
        error: {
          code: error.code,
          message: error.message,
          description: error.description,
        },
      });
    }
    console.error(error);
    return res.status(500).json({
      status: false,
      data: null,
      error: {
        code: "ES5000",
        message: "Internal Server Error",
        description:
          error.message ||
          "An uncontrolled error has occurred in the inspectia server.",
      },
    });
  }

  static create = async (req = request, res = response) => {
    try {
      const {
        company,
        auditName,
        auditType,
        dateTime,
        duration,
        responsibleAudit,
        auditArea,
        objective,
      } = req.body;

      const newSchedule = await ScheduleModel.create(
        company,
        auditName,
        auditType,
        dateTime,
        duration,
        responsibleAudit,
        auditArea,
        objective
      );
      return res.status(201).json({
        status: true,
        data: newSchedule,
        error: null,
      });
    } catch (error) {
      console.log(error);
      return this.#handleError(error, res);
    }
  };
}

export default ScheduleController;
