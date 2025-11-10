import { getDBConnection } from "../../connection.mjs";
import BaseModel from "../base.model.mjs";
import CustomError from "../../../config/errors.mjs";

class EvaluationModel extends BaseModel {
  static dbName = "inspectiaDb";

  static async create(data) {
    const db = await getDBConnection();

    const query = `
      INSERT INTO evaluations (
        url, performance, accessibility, best_practices, seo, overall_score,
        load_time_ms, page_title, playwright_success, id_pagina
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.url,
      data.performance,
      data.accessibility,
      data.best_practices,
      data.seo,
      data.overall_score,
      data.load_time_ms,
      data.page_title,
      data.playwright_success,
      data.id_pagina,
    ];

    const result = await db.query(query, values);

    return true;
  }

  static async createPage(name, description) {
    const db = await getDBConnection();
    const result = await db.query(
      `INSERT INTO pagina (nombre, descripcion) VALUES (?, ?)`,
      [name, description]
    );

    console.log(result);

    return { id: Number(result.insertId) };
  }

  static async findAll() {
    try {
      const db = await getDBConnection();
      const rows = await db.query(`
        SELECT 
          e.id,
          e.url,
          e.performance,
          e.accessibility,
          e.best_practices,
          e.seo,
          e.overall_score,
          e.load_time_ms,
          e.page_title,
          e.playwright_success,
          e.created_at,
          p.nombre AS page_name,
          p.descripcion AS page_description
        FROM evaluations e
        INNER JOIN pagina p ON e.id_pagina = p.id
        ORDER BY e.created_at DESC
      `);

      return rows;
    } catch (error) {
      console.error(error);
      throw CustomError.sqlError(
        "Error obteniendo evaluaciones",
        "EV1000",
        error.message
      );
    }
  }
}

export default EvaluationModel;
