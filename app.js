if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
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
    const { comingFrom, name, email, message, subject, course } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: setDestination(comingFrom),
        subject: !comingFrom ? `Form query received: ${course}` : subject,
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

    res.header("Access-Control-Allow-Origin", "*");
    res.send("success");
});

function setDestination(comingFrom) {
    if (comingFrom === 'paptido') {
        return process.env.TOP;
    }
    else if (comingFrom === 'portfolio') {
        return process.env.TOPORTFOLIO;
    }
    return process.env.TO
}

app.listen(3000, () =>  console.log("Listening...") );