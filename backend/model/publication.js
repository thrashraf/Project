import db from '../config/db.js';

class publication {
  static async showUser() {
    const sql = `SELECT * FROM publication`;
    return db.execute(sql);
  }
  static async createPublication(
    id,
    title,
    description,
    isbn,
    staff,
    year,
    images,
    pdf,
    userId
  ) {
    const sql = `INSERT INTO
                    publication (id, Title, Description, isbn, staff, year, img_url, pdf_url, userId)
                VALUES 
                (
                    '${id}',
                    '${title}',
                    '${description}',
                    '${isbn}',
                    '${staff}',
                    '${year}',
                    '${JSON.stringify(images)}',
                    '${pdf}',
                    '${userId}'
                    
                )`;
    return db.execute(sql);
  }

  static async updatePublication(id, title, description, isbn, staff, year) {
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
    images,
    pdf
  ) {
    const sql = `UPDATE publication SET Title = '${title}',
            Description = '${description}',
            isbn = '${isbn}',
            img_url = '${JSON.stringify(images)}',
            year = '${year}',
            staff = '${staff}',
            pdf_url = '${pdf}'
            where id = '${id}'`;
    return db.execute(sql);
  }

  static async deletePublicationById(id) {
    const sql = `DELETE FROM publication where id = '${id}'`;
    return db.execute(sql);
  }
}

export default publication;
