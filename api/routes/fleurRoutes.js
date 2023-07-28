import express from 'express';
import db from '../configs/database.js';
const router = express.Router();

router.post('/add', (req, res) => {

    const values = [req.body.type, req.body.userid]

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


router.delete('/:id', (req, res) => {

    const {id} = req.params;

    const q = "DELETE FROM `fleur` WHERE idfleur = ?";

    db.query(q, [id] ,(error, data) => {

        if (error) return res.status(500).json(error);

        res.status(200).json({
            message: 'success',
            data: data
        })
    })

});
export default router;