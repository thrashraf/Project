import db from '../config/db.js';

class admin {
  static async updateUser(id, name, email, role, phone_number) {
    const sql = `
        UPDATE
            users
        SET
            name = '${name}',
            email = '${email}',
            role = '${role}',
            phone_number = '${phone_number}'
        where
            id = '${id}'        
    `;
    return db.execute(sql);
  }

  static async updateUserWithImages(
    id,
    name,
    email,
    role,
    phone_number,
    image
  ) {
    const sql = `
        UPDATE
            users
        SET
            name = '${name}',
            email = '${email}',
            role = '${role}',
            phone_number = '${phone_number}',
            profile_picture = '${image}'
        where
            id = '${id}'        
    `;
    console.log(sql);
    return db.execute(sql);
  }

  static async updateUserWithPassword(id, name, email, role, hashPassword) {
    const sql = `
        UPDATE
            users
        SET
            name = '${name}',
            email = '${email}',
            role = '${role}',
            password = '${hashPassword}'
        where
            id = '${id}'        
    `;
    return db.execute(sql);
  }

  static async deleteUser(id) {
    const sql = `
        DELETE FROM users
        where
            id = '${id}'        
    `;
    return db.execute(sql);
  }

  static async createUser(id, name, email, role, phone_number, password) {
    const sql = `
        INSERT INTO
            users (id, name, email, password, role, phone_number)
        VALUES
        (
            '${id}',
            '${name}',
            '${email}',
            '${password}',
            '${role}',
            '${phone_number}'
        )    
    `;
    return db.execute(sql);
  }
}

export default admin;
