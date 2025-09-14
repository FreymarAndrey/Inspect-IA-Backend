import { getDBConnection } from "../../connection.mjs";
import BaseModel from "../base.model.mjs";

class ScheduleModel extends BaseModel {
  static dbName = "inspectiaDb";

  static async create(
    company,
    auditName,
    auditType,
    dateTime,
    duration,
    responsibleAudit,
    auditArea,
    objective
  ) {
    const db = await getDBConnection();
    const result = await db.query(
      `INSERT INTO agendamiento 
        (empresa, nombre_auditoria, tipo_norma_id, fecha, duracion_estimada, auditor_responsable, area_auditar, objetivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company,
        auditName,
        auditType,
        dateTime,
        duration,
        responsibleAudit,
        auditArea,
        objective,
      ]
    );
    return { id: Number(result.insertId) };
  }

  static async findAll() {
    const db = await getDBConnection();
    const [rows] = await db.query(`SELECT * FROM agendamiento`);
    return rows;
  }

  static async deleteById(id) {
    const db = await getDBConnection();
    const [result] = await db.query(`DELETE FROM agendamiento WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

export default ScheduleModel;
