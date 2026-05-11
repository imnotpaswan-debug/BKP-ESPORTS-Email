const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. HOME ROUTE: Isse "Not Found" error khatam ho jayega
app.get('/', (req, res) => {
  res.send('<h1>BKP ESPORTS Server is Live!</h1><p>Server sahi se kaam kar raha hai.</p>');
});

// 2. OTP ROUTE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bkptournament@gmail.com',
    pass: 'aglo dmyb jgew ygkv'
  }
});

app.get('/send-otp', (req, res) => {
  const { email, otp } = req.query;
  
  if (!email || !otp) {
    return res.status(400).send('Error: Email and OTP are required');
  }

  const mailOptions = {
    from: 'BKP ESPORTS <bkptournament@gmail.com>',
    to: email,
    subject: 'OTP Verification - BKP ESPORTS',
    html: `<h3>Namaste Warrior!</h3><p>Aapka OTP code hai: <b>${otp}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).send('Email Sent Successfully to ' + email);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running...'));
