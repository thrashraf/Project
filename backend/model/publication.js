import db from "../config/db.js";

class publication{
    static async showUser() {
        const sql = `SELECT * FROM publication`
        return db.execute(sql)
    }
    static async createPublication(
        id,
        title,
        description,
        isbn,
        staff,
        year,
        image,
        pdf
      ) {
        const sql = `INSERT INTO
                    publication (id, Title, Description, isbn, staff, year, img_url, pdf_url)
                VALUES 
                (
                    '${id}',
                    '${title}',
                    '${description}',
                    '${isbn}',
                    '${staff}',
                    '${year}',
                    '${image}',
                    '${pdf}'
                    
    
                )`;
        return db.execute(sql);
      }
}


export default publication;