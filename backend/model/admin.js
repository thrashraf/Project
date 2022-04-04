import db from "../config/db.js";

class admin {
  
    static async updateUser(id, name, email, role) {
        const sql = `
        UPDATE
            users
        SET
            name = '${name}',
            email = '${email}',
            role = '${role}'
        where
            id = '${id}'        
    `
        return db.execute(sql)
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
    `
        return db.execute(sql)
    }

    static async deleteUser(id) {
        const sql = `
        DELETE FROM users
        where
            id = '${id}'        
    `
        return db.execute(sql)
    }
}

export default admin;
