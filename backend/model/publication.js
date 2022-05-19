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

      static async updatePublication(
        id,
        title, 
        description,
        isbn, 
        staff, 
        year, 
      ) {
        const sql = `UPDATE publication SET Title = '${title}',
            Description = '${description}',
            isbn = '${isbn}',
            year = '${year}',
            staff = '${staff}'
            where id = '${id}'`;
        return db.execute(sql);
      }

      static async updatePublicationWithImage(
        id,
        title, 
        description,
        isbn, 
        staff, 
        year, 
        images
      ) {
        const sql = `UPDATE publication SET Title = '${title}',
            Description = '${description}',
            isbn = '${isbn}',
            img_url = '${images}',
            year = '${year}',
            staff = '${staff}'
            where id = '${id}'`;
        return db.execute(sql);
      }

      static async deletePublicationById(id) {
        const sql = `DELETE FROM publication where id = '${id}'`;
        return db.execute(sql);
      }
    
}


export default publication;