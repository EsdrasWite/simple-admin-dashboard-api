import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        adresse:'',
        password:''
    }
})

module.exports = transporter;