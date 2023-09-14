import db from "../configs/database.js";

function getSalleInfo(req, res){

    const q = `SELECT * FROM user`;

    db.query(q, (error, data) => {
        if (error) return res.status(500).json(error); 
        res.status(200).json({
            message: 'info pot salle serveur',
            data: data 
        })
    })
}

export default {
    getSalleInfo
}