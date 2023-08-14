import express from "express";
import db from "../configs/database.js";

const router = express.Router();

router.get('/', (req, res) => {

    const q = `SELECT * FROM infopotfleur`;

    db.query(q, (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'info pot fleur',
            data: data
        })
    })
})

export default router;