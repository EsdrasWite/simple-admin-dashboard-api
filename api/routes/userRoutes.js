import express from "express";
import db from "../configs/database.js";

const router = express.Router();

router.post('/', (req, res) => {

    const { username, password } = req.body;

    const q = "INSERT INTO user(`username`, `password`) VALUES (?)";

    db.query(q, [username, password], (error, result) => {
        if (error) {
           return res.status(500).json({
                message: 'There is an internal error',
                error: error
            })
        }else{
            res.status(200).json({
                message:'sucess',
                data:result
            })
        }
    })


    res.status(200).json({
        message: "user created"
    })
});

router.get('/', (req, res) => {
    res.status(200).json({
        message: "User retreived",

    })
})

export default router;