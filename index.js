const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bkptournament@gmail.com',
    pass: 'aglo dmyb jgew ygkv' // Aapka App Password
  }
});

app.get('/', (req, res) => res.send('BKP Server is Live!'));

app.get('/send-otp', (req, res) => {
  const { email, otp } = req.query;
  
  const mailOptions = {
    from: 'BKP ESPORTS <bkptournament@gmail.com>',
    to: email,
    subject: 'OTP Verification - BKP ESPORTS',
    html: `<h2>Namaste!</h2><p>Aapka OTP code hai: <b>${otp}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).send('OTP Sent');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running...'));
