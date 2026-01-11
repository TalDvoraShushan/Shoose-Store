import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); 

const config = {
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
};

const pool = mysql.createPool(config).promise();

const query = async function(sql) {
    const conn = await pool.getConnection();
    const result = await conn.query(sql);
    conn.release();
    return result;
};

export default query;
