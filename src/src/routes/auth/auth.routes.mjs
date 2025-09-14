import { Router } from "express";
import AuthController from "../../controllers/auth.controller.mjs";
import { validateRegister } from "../../validators/auth.validator.mjs";

class AuthRoutes {
  static get routes() {
    const router = Router();

    router.post("/register", validateRegister(), AuthController.register);
    router.post("/login", AuthController.login);

    return router;
  }
}

export default AuthRoutes.routes;
