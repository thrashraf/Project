import db from "../config/db.js";

class activities {
  
    static async getAllActivities() {
        const sql = `SELECT * FROM activities`
        return db.execute(sql)
    }

    static async createActivities(id, title, start, end, organizer, venue, image) {
        const sql = `INSERT INTO
                activities (id, title, start, end, organizer, venue, img_url)
            VALUES
            (
                '${id}',
                '${title}',
                '${start}',
                '${end}',
                '${organizer}',
                '${venue}',
                '${JSON.stringify(image)}'
            )`;
        return db.execute(sql)
    }

}

export default activities;
