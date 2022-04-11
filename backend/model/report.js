import db from "../config/db.js";

class report {
  static async createReport(
    userId,
    owner,
    profile_picture,
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
                report (userId, owner, profile_picture, id, program_name, date, organizer, venue, images, content, tentative, committee, status)
            VALUES
            (
                '${userId}',
                '${owner}',
                '${profile_picture}',
                '${id}',
                '${title}',
                '${date}',
                '${organizer}',
                '${venue}',
                '${JSON.stringify(images)}',
                '${content}',
                '${JSON.stringify(tentative)}',
                '${JSON.stringify(ajk)}',
                'pending'
            )`;
    return db.execute(sql);
  }

  static async getAllreport() {
    const sql = `SELECT * FROM report`
    return db.execute(sql);
  }

  static async verifyReport(id, status) {
    const sql = `update report SET status='${status}' WHERE id = '${id}'`
    return db.execute(sql);
  }
}

export default report;
