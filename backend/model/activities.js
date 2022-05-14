import db from '../config/db.js';

class activities {
  static async getAllActivities() {
    const sql = `SELECT * FROM activities`;
    return db.execute(sql);
  }

  static async createActivities(
    id,
    title,
    start,
    end,
    organizer,
    venue,
    image,
    username,
    email
  ) {
    const sql = `INSERT INTO
                activities (id, title, start, end, organizer, venue, banner, username, email)
            VALUES 
            (
                '${id}',
                '${title}',
                '${start}',
                '${end}',
                '${organizer}',
                '${venue}',
                '${image}',
                '${username}',
                '${email}'

            )`;
    return db.execute(sql);
  }

  static async deleteActivitiesById(id) {
    const sql = `DELETE FROM activities where id = '${id}'`;
    return db.execute(sql);
  }

  static async updateActivitiesById(
    id,
    title,
    start,
    organizer,
    venue,
    images
  ) {
    const sql = `UPDATE activities SET title = '${title}',
        start = '${start}',
        organizer = '${organizer}',
        venue = '${venue}',
        banner = '${images}'
        where id = '${id}'`;
    return db.execute(sql);
  }

  static async getActivitiesById(
    id
  ) {
    const sql = `SELECT * FROM activities where id = '${id}'`;
    return db.execute(sql);
  }

  static async createReport(
    submitOn,
    userId,
    owner,
    id,
    images,
    content,
    tentative,
    ajk,
    signature
  ) {
    const sql = `update activities SET 
                submitOn = '${submitOn}',
                userId = '${userId}',
                owner = '${owner}', 
                images = '${JSON.stringify(images)}',
                content = '${content}',
                tentative = '[${tentative}]',
                committee = '[${ajk}]',
                status = 'pending',
                signature = '${signature}' where id = '${id}'`;
    console.log(sql)
    return db.execute(sql);
  }

  static async updateStatus(
    id,
    status
  ) {
    const sql = `UPDATE activities SET status = '${status}' where id = '${id}'`;
    return db.execute(sql);
  }
}

export default activities;
