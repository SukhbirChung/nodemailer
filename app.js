if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const configurations = {
    host: process.env.HOSTNAME,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
};

const transporter = nodemailer.createTransport(configurations);

app.post('/', (req, res) => {
    const { name, course, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO,
        subject: `Form query received: ${course}`,
        text: `Name: ${name}
Email: ${email}
Message: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send("success");
});

app.listen(3000, () =>  console.log("Listening...") );