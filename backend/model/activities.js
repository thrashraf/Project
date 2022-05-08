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
                activities (id, title, start, end, organizer, venue, img_url, username, email)
            VALUES 
            (
                '${id}',
                '${title}',
                '${start}',
                '${end}',
                '${organizer}',
                '${venue}',
                '${JSON.stringify(image)}',
                '${username}',
                '${email}'

            )`;
    return db.execute(sql);
  }

  static async deleteActivitiesById(title) {
    const sql = `DELETE FROM activities where title = '${title}'`;
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
        img_url = '${JSON.stringify(images)}'
        where id = '${id}'`;
    return db.execute(sql);
  }
}

export default activities;
