import mariadb from "mariadb";
import envs from "../config/environments.mjs";

export const pool = mariadb.createPool({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  user: envs.DB_USER,
  password: envs.DB_PASS,
  database: envs.DB_NAME,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
});

export const getDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database is online");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
