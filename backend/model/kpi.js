import db from '../config/db.js';

class kpi {
  static async showKpi() {
    const sql = `SELECT * FROM kpi`;
    return db.execute(sql);
  }

  static async updateKpi(event, publication, innovation) {
    const sql = `UPDATE kpi set 
    event = '${event}',
    publication = '${publication}',
    innovation = '${innovation}'`;
    return db.execute(sql);
  }
}
export default kpi;
