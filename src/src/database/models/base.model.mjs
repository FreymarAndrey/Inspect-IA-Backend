import { getDBConnection } from "../connection.mjs";

class BaseModel {
  static async connectDB() {
    if (!this.dbName)
      throw new Error("Database name not defined for this model.");
    return await getDBConnection();
  }
}

export default BaseModel;
