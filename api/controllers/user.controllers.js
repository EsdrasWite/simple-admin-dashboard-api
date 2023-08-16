import db from "../configs/database.js";
import transporter from "../configs/services.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

function signup(req, res) {

    const { username, password } = req.body;

    const q1 = `SELECT * FROM user WHERE username='${username}'`;

    const q2 = "INSERT INTO user(`username`, `password`) VALUES (?,?)";

    db.query(q1, (error, rows) => {

        if (error) return res.status(500).json({ message: "Une erreur est survenue, réessayer" });

        if (rows.length >= 1) return res.status(500).json({ message: "Cet utilsateur existe" });

        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return res.status(500).json({ message: "Une erreur est survenue, réessayer1" });
            const entriesData = [username, hash];

            db.query(q2, entriesData, (err, data) => {

                if (err) return res.status(500).json({ 
                    message: "Une erreur est survenue, réessayer2",
                    erreur:err
            });

                res.status(200).json({
                    message: 'Inscription reussie',
                    data: data
                })

            })
        })
    })

}

function signin(req, res) {
 
    const { username, password } = req.body;

    let sqlQuery = `SELECT * FROM user WHERE username = '${username}'`;

    db.query(sqlQuery, (error, data) => {

        if (error) return res.status(500).json({ message: "Une erreur est survenue, réessayer" });

        if (data.length < 1) return res.status(401).json({ message: "Adresse email ou mot de passe incorrect, réessayer" });

        bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) return res.json({
                 message: 'Une erreur s\'est produite, réessayer plus tard',
                erreur:err 
            });
            if (!result) return res.json({ 
                message: 'Mot de passe incorrect',
            
            });

            const payload = {
                _idUser: data[0].id,
                _nom: data[0].username,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: '6h'
            });

            res.status(200).json({
                message: 'Authentification reussie',
                username: data[0].username,
                id: data[0].iduser,
                token: token
            })
        })
    })
}

function get_all_users(req, res) {

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
}

function get_user_by_id(req, res) {
    const userId = req.params.id;
    const q = "SELECT * FROM user WHERE `iduser` = ?";

    db.query(q, [userId], (error, data) => {
        if (error) return res.status(500).json(error)

        res.status(200).json({
            message: 'success',
            data
        })
    })
}

function forget_password(req, res) {

    const { username } = req.body;

    const q1 = "SELECT * FROM `user` WHERE `username` = ?";

    db.query(q1, [username], (error, data) => {

        if (error) return res.status(500).json(error);

        if (data.length > 0) {
            //create new token
            const secret = process.env.SECRET_KEY + data.password;

            const payload = {
                userId: data.iduser,
                username: data.username
            };

            const token = jwt.sign(payload, secret, {
                expiresIn: '10m'
            });

            const link = `localhost:7000/user/reset-password/${payload.userId}/${token}`;


            var mailOptions = {
                from: 'Malkiah Application ): <joellematabishi@gmail.com>',
                to: username,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!',
                html: `<h2>Cliquer sur ce lien pour reinitialiser le mot de passe </h2><br/>${link}`
            };

            // const mailOptions = {
            //     from: 'Malkiah Application ): <joellematabishi@gmail.com>',
            //     to: username,
            //     subject: 'Reset password',
            //     html: `<h2>Cliquer sur ce lien pour reinitialiser le mot de passe </h2><br/>${link}`
            // };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info.response)
                    return res.status(200).json({
                        message: `Un lien contenant le nouveau mot de passe a été envoyé à l\'adresse ${username}`,
                        info: info
                    })
                }
            })

        } else {
            return res.status(400).json({
                message: 'Utilisateur non existant'
            })
        }
    })
}

function reset_password(req, res) {

    const { id, token } = req.params;

    const { password } = req.body;

    const q1 = `SELECT * FROM 'user' WHERE 'iduser'='${id}'`

    const q2 = `UPDATE user SET password = '${password}' WHERE iduser='${id}'`

    db.query(q1, (error, data) => {

        if (error) return res.status(500).json(error);

        if (data.length > 0) {
            //verification of the token
            const secret = process.env.SECRET_KEY + data.password;

            const payload = jwt.verify(token, secret)

            if (payload) {
                db.query(q2, (error, data) => {
                    if (error) return console.log(error.message);
                    res.status(200).json({
                        message: "mot de pass modifié avec succes",
                        data
                    })
                })
            }
            else {
                res.status(402).json({
                    message: "EChec de verification",
                })
            }
        } else {
            return res.json({
                message: 'Une erreur s\est produit, réessayer plus tard'
            })
        }
    })
}

export default {
    get_all_users, get_user_by_id, signup, signin, forget_password, reset_password
}