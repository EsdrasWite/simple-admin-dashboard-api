import mysql from 'mysql2';
import 'dotenv/config'

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DBNAME,
});

export default db;
