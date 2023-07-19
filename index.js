import express from 'express';
import mysql from 'mysql2';
import userRoutes from './api/routes/userRoutes.js';
import fleurRoutes from './api/routes/fleurRoutes.js';
import compteurRoutes from './api/routes/compteurRoutes.js';

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"malkiadashbord"
});

app.use('/user', userRoutes);
app.use('/fleur', fleurRoutes);
app.use('/compteur', compteurRoutes);

app.get("/", (req, res)=>{
    res.json('Welcome to malkia_server dashbord')
});



const PORT = 8800;

app.listen(PORT, ()=>{
    console.log("The app is running to the port", PORT);
})