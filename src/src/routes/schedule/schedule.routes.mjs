import { Router } from "express";
import { validateSchedule } from "../../validators/schedule.validator.mjs";
import ScheduleController from "../../controllers/schedule.controller.mjs";

class ScheduleRoutes {
  static get routes() {
    const router = Router();

    router.post("/create", validateSchedule(), ScheduleController.create);

    return router;
  }
}

export default ScheduleRoutes.routes;
