import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joellematabishi@gmail.com',
    pass: 'joelleK1998'
  }
});

export default transporter;