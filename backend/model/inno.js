import db from '../config/db.js';

class inno {
  static async showUser() {
    const sql = `SELECT * FROM innovation`;
    return db.execute(sql);
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
    image,
    pdf
  ) {
    const sql = `INSERT INTO
                    innovation (id, Title,Description, Name, Program, Level, Medal, Year, img_url, pdf_url)
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
                    '${image}',
                    '${pdf}'
                )`;
    return db.execute(sql);
  }

  static async updateInnovation(
    id,
    Title,
    Description,
    Name,
    Program,
    Level,
    Medal,
    Year
  ) {
    const sql = `UPDATE innovation SET Title = '${Title}',
            Description = '${Description}',
            Name = '${Name}',
            Program = '${Program}',
            Level = '${Level}',
            Medal = '${Medal}',
            Year = '${Year}'
            where id = '${id}'`;
    return db.execute(sql);
  }

  static async updateInnovationWithImages(
    id,
    Title,
    Description,
    Name,
    Program,
    Level,
    Medal,
    Year,
    images,
    pdf
  ) {
    console.log(images, pdf);
    const sql = `UPDATE innovation SET Title = '${Title}',
            Description = '${Description}',
            Name = '${Name}',
            Program = '${Program}',
            Level = '${Level}',
            Medal = '${Medal}',
            Year = '${Year}',
            img_url = '${images}',
            pdf_url = '${pdf}'
            where id = '${id}'`;
    return db.execute(sql);
  }

  static async deleteInnovationById(id) {
    const sql = `DELETE FROM innovation where id = '${id}'`;
    return db.execute(sql);
  }
}
export default inno;
