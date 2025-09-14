import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { pool } from "../database/connection.mjs";

class Server {
  constructor(port, routes) {
    dotenv.config();
    this.app = express();
    this.server = createServer(this.app);
    this.port = port;
    this.routes = routes;

    this.app.get("/ping", async (req, res) => {
      const [rows] = await pool.query("SELECT NOW() AS now");
      res.json(rows);
    });

    const PORT = 4001 || process.env.PORT;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.disable("x-powered-by");
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(this.routes);
  }

  start() {
    this.middlewares();
    this.server.listen(this.port, (err) => {
      if (err) {
        console.error(`Error starting server: ${err.message}`);
      } else {
        console.log(`Server is running on port ${this.port}`);
      }
    });
  }
}

export default Server;
