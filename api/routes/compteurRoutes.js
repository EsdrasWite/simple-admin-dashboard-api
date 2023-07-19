import express, { json } from "express";
import db from "../configs/database.js";

const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({
        message: "compteur created"
    })
});

router.get('/', (req, res)=>{

    const q = `SELECT * FROM compteur`;

    db.query(q, (error, data)=>{
        if(error) return res.status(500).json(error);
        res.status(200).json({
            message:'success',
            data:data
        })
    })
})

export default router;