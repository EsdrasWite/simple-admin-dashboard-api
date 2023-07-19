import express from 'express';
import mysql from 'mysql2'

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"malkiadashbord"
})

const PORT = 8800;

app.listen(PORT, ()=>{
    console.log("The app is running to the port", PORT);
})