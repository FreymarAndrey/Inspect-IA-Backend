import { response } from "express";
import CustomError from "../config/errors.mjs";
import UserModel from "../database/models/inspectia/user.model.mjs";
import Encrypter from "../config/encryptor.mjs";
import JWT from "../config/jwt.mjs";

class AuthController {
  static #handleError = (error, res = response) => {
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
  };

  static register = async (req = request, res = response) => {
    try {
      const { firstname, lastname, phone, company, email, password } = req.body;
      console.log(email);

      const user = await UserModel.findByEmail(email);

      console.log(user);
      if (user)
        throw CustomError.badRequest(
          "UserNotFoundException",
          "AM1101",
          "el correo ya existe"
        );

      const hashedPassword = Encrypter.hash(password);

      await UserModel.create(
        firstname,
        lastname,
        phone,
        company,
        email,
        hashedPassword
      );

      return res.status(200).json({
        status: true,
        data: null,
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static login = async (req = request, res = response) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);

      if (!user) {
        throw CustomError.badRequest(
          "UserNotFoundException",
          "AM1201",
          "El correo no está registrado"
        );
      }

      const validPassword = Encrypter.compare(password, user.contrasena);
      if (!validPassword) {
        throw CustomError.badRequest(
          "InvalidCredentialsException",
          "AM1202",
          "Contraseña incorrecta"
        );
      }

      const token = await JWT.generateToken(
        { uid: user.id, name: user.nombres, email: user.email },
        "2h"
      );

      return res.status(200).json({
        status: true,
        data: {
          user,
          token,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);

      this.#handleError(error, res);
    }
  };
}

export default AuthController;
