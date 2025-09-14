import { getDBConnection } from "../../connection.mjs";
import CustomError from "../../../config/errors.mjs";

class UserModel {
  static dbName = "inspectiaDb";

  static create = async (
    firstname,
    lastname,
    phone,
    company,
    email,
    hashedPassword
  ) => {
    try {
      const db = await getDBConnection();
      const result = await db.query(
        `INSERT INTO usuarios 
          (nombres, apellidos, telefono, empresa, correo, contrasena) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [firstname, lastname, phone, company, email, hashedPassword]
      );
      return { id: result.insertId };
    } catch (error) {
      throw CustomError.sqlError(
        "Error creando el usuario",
        "US2005",
        error.message
      );
    }
  };

  static findAll = async () => {
    try {
      const db = await getDBConnection();
      const users = await db.query(
        `SELECT 
          id,
          nombres,
          apellidos,
          telefono,
          empresa,
          correo,
          creado_en
        FROM usuarios`
      );
      return users;
    } catch (error) {
      throw CustomError.sqlError(
        "Error obteniendo usuarios",
        "US2000",
        error.message
      );
    }
  };

  static findByColumn = async (column, value) => {
    try {
      const db = await getDBConnection();
      const rows = await db.query(
        `SELECT * FROM usuarios WHERE ?? = ? LIMIT 1`,
        [column, value]
      );
      return rows[0] || null;
    } catch (error) {
      throw CustomError.sqlError(
        "Error al obtener el usuario por columna",
        "US2002",
        error.message
      );
    }
  };

  static update = async (id, data) => {
    try {
      const db = await getDBConnection();
      const fields = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(data);
      values.push(id);

      const result = await db.query(
        `UPDATE usuarios SET ${fields} WHERE id = ?`,
        values
      );
      return result.affectedRows;
    } catch (error) {
      throw CustomError.sqlError(
        "Ocurrio un error al actualizar un usuario",
        "US2003",
        error.message
      );
    }
  };

  static findByEmail = async (email) => {
    try {
      const db = await getDBConnection();
      const rows = await db.query(
        `SELECT * FROM usuarios WHERE correo = ? LIMIT 1`,
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw CustomError.sqlError(
        "Ocurrio un error al traer un usuario por el correo",
        "US2007",
        error.message
      );
    }
  };

  static findUserById = async (id) => {
    try {
      const db = await getDBConnection();
      const rows = await db.query(
        `SELECT * FROM usuarios WHERE id = ? LIMIT 1`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw CustomError.sqlError(
        "Ocurrio un error al traer un usuario por el id",
        "US2008",
        error.message
      );
    }
  };
}

export default UserModel;
