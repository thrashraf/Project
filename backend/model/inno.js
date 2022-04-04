import db from "../config/db.js";

class inno{
    static async showUser() {
        const sql = `SELECT * FROM innovasion`
        return db.execute(sql)
    }
}
export default inno;