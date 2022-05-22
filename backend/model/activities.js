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
    email,
    userId
  ) {
    const sql = `INSERT INTO
                activities (id, title, start, end, organizer, venue, banner, username, email, userId)
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
                '${email}',
                '${userId}'
            )`;
    return db.execute(sql);
  }

  static async deleteActivitiesById(id) {
    const sql = `DELETE FROM activities where id = '${id}'`;
    return db.execute(sql);
  }

  static async updateActivities(
    id,
    title,
    start,
    organizer,
    venue,
    prevImages
  ) {
    const sql = `UPDATE activities SET title = '${title}',
        start = '${start}',
        organizer = '${organizer}',
        venue = '${venue}'
        where id = '${id}'`;
    return db.execute(sql);
  }


  static async updateActivitiesWithImage(
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

  static async getActivitiesById(id) {
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
    position,
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
                position = '${position}',
                tentative = '[${tentative}]',
                committee = '[${ajk}]',
                status = 'pending',
                signature = '${signature}' where id = '${id}'`;
    console.log(sql);
    return db.execute(sql);
  }

  static async createReportWithoutImages(
    submitOn,
    userId,
    owner,
    prevImages,
    id,
    content,
    position,
    tentative,
    ajk,
    signature
  ) {
    const sql = `update activities SET 
                  submitOn = '${submitOn}',
                  userId = '${userId}',
                  owner = '${owner}', 
                  images = '${JSON.stringify(prevImages)}',
                  content = '${content}',
                  position = '${position}',
                  tentative = '[${tentative}]',
                  committee = '[${ajk}]',
                  status = 'pending',
                  signature = '${signature}' where id = '${id}'`;
    console.log(sql);
    return db.execute(sql);
  }

  static async updateStatus(id, status, signature, kjName) {
    const sql = `UPDATE activities SET status = '${status}', kjSignature = '${signature}', kjName = '${kjName}' where id = '${id}'`;
    return db.execute(sql);
  }

  static async getReportUser(id) {
    const sql = `SELECT * FROM activities where userId = '${id}'`;
    return db.execute(sql);
  }
}

export default activities;
