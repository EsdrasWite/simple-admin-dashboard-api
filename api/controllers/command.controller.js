import db from "../configs/database.js";

function changeStatus(req, res) {

    const q = "UPDATE `datastatus` SET `statusfan`=(?) WHERE 1";
    db.query(q, [req.body.valueData], (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'current status',
            data: data
        })
    })
}

function changeTemp(req, res) {
    const q = "UPDATE `datacommand` SET `temperature`=(?) WHERE 1";
    db.query(q, [req.body.valueData], (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'server room temperature',
            data: data
        })
    })
}


function getTemp(req, res) {
    const q = "SELECT `temperature` FROM `datacommand`";
    db.query(q, (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'server room temperature',
            data: data
        })
    })
}

function getStatus(req, res) {
    const q = "SELECT `statusfan` FROM `datastatus`";
    db.query(q, (error, data) => {
        if (error) return res.status(500).json(error);
        res.status(200).json({
            message: 'server room status',
            data: data
        })
    })
}


export default {
    changeStatus, changeTemp, getTemp, getStatus
}