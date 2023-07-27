import express from "express";
import db from "../configs/database.js";

const router = express.Router();

router.get('/', (req, res) => {

    const q = `SELECT * FROM user`;

    db.query(q, (error, data) => {

        if (error) return res.status(500).json(error);

        if (data.length > 0) {       
            res.status(200).json({
                message: 'sucess',
                data
            })
        } else {
            return res.status(401).json({
                message: 'Aucun utilisateur disponible'
            })
        }
    })
})

router.post('/signup', (req, res) => {

    const { username, password } = req.body;

    const q = "INSERT INTO user(`username`, `password`) VALUES (?,?)";

    db.query(q, [username, password], (error, data) => {
        if (error) {
            return res.status(500).json({
                message: 'There is an internal error',
                error: error
            })
        } else {
            res.status(200).json({
                message: "user created",
                data: data
            })
        }
    })
});

router.post('/signin', (req, res) => {

    const { username, password } = req.body;

    const q = `SELECT * FROM user WHERE username = '${username}'`;

    db.query(q, (error, data) => {

        if (error) return res.status(500).json(error);

        if (data.length > 0) {
            if (!(data[0].password === password)) return res.json('Mot de passe incorrect');
            res.status(200).json({
                message: 'sucess'
            })
        } else {
            return res.status(400).json({
                message: 'Utilisateur non existant'
            })
        }
    })
})

export default router;