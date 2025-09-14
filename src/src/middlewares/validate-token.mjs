import CustomError from "../config/errors.mjs";
import JWT from "../config/jwt.mjs";

class AuthMiddleware {
  static #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
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
          "An uncontrolled error has occurred in the inspectia server.",
      },
    });
  };

  static validateJWT = async (req = request, res = response, next) => {
    try {
      const authorization = req.header("Authorization");
      if (!authorization)
        return res
          .status(401)
          .json({ status: false, data: null, error: "No token provided" });
      if (!authorization.startsWith("Bearer "))
        return res
          .status(401)
          .json({ status: false, data: null, error: "Invalid Bearer token" });
      const token = authorization.split(" ").at(1) || "";
      const { email } = JWT.verify(token, envs.SECRET_JWT);
      req.email = email;
      req.token = token;
      next();
    } catch (error) {
      this.#handleError(error, res);
    }
  };
}

export default AuthMiddleware;
