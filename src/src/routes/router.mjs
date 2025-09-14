import { Router } from "express";
import authRoutes from "./auth/auth.routes.mjs";
import scheduleRoutes from "./schedule/schedule.routes.mjs";

class AppRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/api", (_, res) => {
      res.status(200).send("inspectIA API is Online");
    });

    const routes = [
      { path: "/api/v1/auth", route: authRoutes },
      { path: "/api/v1/schedule", route: scheduleRoutes },
    ];

    routes.forEach((route) => {
      this.router.use(route.path, route.route);
    });
  }

  get routes() {
    return this.router;
  }
}

export default new AppRouter();
