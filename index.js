import 'dotenv/config.js';
import express from 'express';
import userRoutes from './api/routes/userRoutes.js';
import fleurRoutes from './api/routes/fleurRoutes.js';
import compteurRoutes from './api/routes/compteurRoutes.js';


const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/fleur', fleurRoutes);
app.use('/compteur', compteurRoutes);


app.get("/", (req, res) => {
    res.json('Welcome to malkia_server dashbord')
});

let PORT;
console.log(PORT);
process.env.STATUS === 'production'
    ? (PORT = process.env.DEV_PORT)
    : (PORT = process.env.PROD_PORT);

app.listen(PORT, () => {
    console.log("The app is running to the port", PORT);
})