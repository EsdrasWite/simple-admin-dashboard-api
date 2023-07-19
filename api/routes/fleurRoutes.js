import express from 'express';
import db from '../configs/database';
const router = express.Router();

router.post('/', (req, res) => {

    const values = [req.body.type]

    const q = "INSERT INTO `fleur`(`type`, `user_iduser`) VALUES (?)";

    db.query(q, values, (error, data) => {

        if (error) return res.status(500).json(error);

        res.status(200).json({
            message: 'success',
            data: data
        })
    })


});

router.get('/', (req, res) => {

    const q = "SELECT `idfleur`, `type`, `user_iduser` FROM `fleur`";

    db.query(q, (error, data) => {
        
        if (error) return res.status(500).json(error);

        res.status(200).json({
            message: 'success',
            data: data
        })
    })

})

export default router;