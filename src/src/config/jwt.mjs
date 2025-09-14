import jwt from "jsonwebtoken";
import envs from "./environments.mjs";

class JWT {
  static async generateToken(payload, duration = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.SECRET_JWT,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          return resolve(token);
        }
      );
    });
  }
}

export default JWT;
