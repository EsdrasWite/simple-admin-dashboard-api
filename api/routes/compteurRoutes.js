import express from "express";
import db from "../configs/database.js";

const router = express.Router();

router.post('/', (req, res) => {

    const q = "INSERT INTO `compteur`(`airtemperature`, `airhumidity`, `groundhumidity`, `citernlevel`, `fleur_idfleur`) VALUES(?)";

    const values = [
        req.body.airtemperature,
        req.body.airhumidity,
        req.body.groundhumidity,
        req.body.airtemperature,
        req.body.citernlevel,
        req.body.fleur_idfleur,
    ];

    db.query(q, values, (error, data) => {
        
        if (error) return res.status(500).json(error);

        res.status(200).json({
            message: 'success',
            data: data
        })

    })

});

router.get('/', (req, res) => {

    const q = `SELECT * FROM compteur`;

    db.query(q, (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'success',
            data: data
        })
    })
})

export default router;