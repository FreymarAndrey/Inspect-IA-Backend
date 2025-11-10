import { Router } from "express";
import EvaluationController from "../../controllers/evaluation.controller.mjs";

class EvaluationRoutes {
  static get routes() {
    const router = Router();

    router.post("/create", EvaluationController.evaluateSite);
    router.get("/all-evaluation", EvaluationController.getResult);

    return router;
  }
}

export default EvaluationRoutes.routes;
