import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

export default pool.promise() 