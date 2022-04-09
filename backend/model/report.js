import db from "../config/db.js";

class report {
  static async createReport(
    id,
    title,
    date,
    organizer,
    venue,
    images,
    content,
    tentative,
    ajk
  ) {
    const sql = `INSERT INTO
                report (id, program_name, date, organizer, venue, images, content, tentative, committee)
            VALUES
            (
                '${id}',
                '${title}',
                '${date}',
                '${organizer}',
                '${venue}',
                '${JSON.stringify(images)}',
                '${content}',
                '${JSON.stringify(tentative)}',
                '${JSON.stringify(ajk)}'
            )`;
    return db.execute(sql);
  }
}

export default report;
