import db from "../config/db.js";

class inno{
    static async showUser() {
        const sql = `SELECT * FROM innovasion`
        return db.execute(sql)
    }
    static async createInnovation(
        id,
        Title,
        Name,
        Program,
        Level,
        Medal,
        Year,
        image
      ) {
        const sql = `INSERT INTO
                    innovasion (id, Title, Name, Program, Level, Medal, Year, img_url)
                VALUES 
                (
                    '${id}',
                    '${Title}',
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