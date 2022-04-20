import db from "../config/db.js";

class activities {
  
    static async getAllActivities() {
        const sql = `SELECT * FROM activities`
        return db.execute(sql)
    }

}

export default activities;
