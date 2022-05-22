import db from '../config/db.js';

class user {
  static async checkEmail(email) {
    const sql = `SELECT * FROM users where email = '${email}'`;
    return db.execute(sql);
  }

  static async register(id, name, email, password) {
    const sql = `INSERT INTO
            users (id, name, email, password, role)
        VALUES
        (
            '${id}',
            '${name}',
            '${email}',
            '${password}',
            'staff'
            
        )`;
    return db.execute(sql);
  }

  static async updateRefreshToken(id, refreshToken) {
    const sql = `UPDATE users
                    SET RefreshToken = '${refreshToken}'
                    WHERE id =  '${id}'`;
    return db.execute(sql);
  }

  static async findRefreshToken(refreshToken) {
    const sql = `SELECT * FROM users
                    WHERE RefreshToken = '${refreshToken}' `;
    return db.execute(sql);
  }

  static async deleteRefreshToken(id) {
    const sql = `UPDATE users
                    SET RefreshToken = '${null}'
                    WHERE id = '${id}'`;
    return db.execute(sql);
  }

  static async getAllUser() {
    const sql = `SELECT * FROM users`;
    return db.execute(sql);
  }

  static async findByEmail(email) {
    const sql = `SELECT * FROM users where email = '${email}'`;
    return db.execute(sql);
  }

  static async getUserById(id) {
    const sql = `SELECT * FROM users where id = '${id}'`;
    return db.execute(sql);
  }

  static async updateUserInformation(id, name, position, email, phoneNumber) {
    const sql = `UPDATE users 
                SET name = '${name}',
                email = '${email}',
                position = '${position}', 
                phone_number = '${phoneNumber}'
                where id = '${id}'`;
    return db.execute(sql);
  }

  static async updatePicture(image, email) {
    const sql = `UPDATE users 
                SET profile_picture = '${image}'
                where email = '${email}'`;
    return db.execute(sql);
  }

  static async updateSignature(image, email) {
    const sql = `UPDATE users 
                SET signature = '${image}'
                where email = '${email}'`;
    return db.execute(sql);
  }

  static async updatePassword(id, password) {
    const sql = `UPDATE users 
                SET password = '${password}'
                where id = '${id}'`;
    return db.execute(sql);
  }

  static async calculateUser() {
    const sql = `SELECT 
                  COUNT(*)
              FROM
                  users;`;
    return db.execute(sql);
  }
}

export default user;
