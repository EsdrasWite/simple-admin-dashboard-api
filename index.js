import 'dotenv/config.js';
import express from 'express';
import cors from 'cors'
import userRoutes from './api/routes/userRoutes.js';
import infoSalleRoutes from './api/routes/infoSalleRoutes.js';

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', userRoutes);
app.use('/infosalle', infoSalleRoutes);


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