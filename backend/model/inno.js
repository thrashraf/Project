import db from "../config/db.js";

class inno{
    static async showUser() {
        const sql = `SELECT * FROM innovation`
        return db.execute(sql)
    }
    static async createInnovation(
        id,
        Title,
        Description,
        Name,
        Program,
        Level,
        Medal,
        Year,
        image
      ) {
        const sql = `INSERT INTO
                    innovation (id, Title,Description, Name, Program, Level, Medal, Year, img_url)
                VALUES 
                (
                    '${id}',
                    '${Title}',
                    '${Description}',
                    '${Name}',
                    '${Program}',
                    '${Level}',
                    '${Medal}',
                    '${Year}',
                    '${image}'
                    
    
                )`;
        return db.execute(sql);
      }
}
export default inno;