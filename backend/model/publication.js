import db from "../config/db.js";

class publication{
    static async showUser() {
        const sql = `SELECT * FROM publication`
        return db.execute(sql)
    }
}
export default publication;