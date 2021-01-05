import express, { response } from "express";
import path from 'path';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'resources/static/'));
app.set('view engine', 'ejs');

app.use('/', express.static('src/resources/static'));

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => res.render('accueil', {port}));

app.get('/installations', (req, res) => res.render('installations'));
app.get('/depannage', (req, res) => res.render('depannage'));
app.get('/maintenance', (req, res) => res.render('maintenance'));

app.get('/contact', (req, res) => res.render('contact'));

app.get('/reservations', (req, res) => res.render('reservations'));

app.get('/mentionLegales', (req, res) => res.render('mentionLegales'));

// envoi données formulaire par mail via nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diot.ghislaine@gmail.com',
        pass: 'jadoreObelix1'
    }
});

app.post('/contact', (req, res, next) => {
    const response = {
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        object: req.body.object
    };

    const mailOptions = {
        from: response.email,
        to: 'diot.ghislaine@gmail.com',
        subject: 'Message de ' + response.name + ' ' + response.prenom,
        text: response.object
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        }else {
            console.log('Email sent: ' + info.response);
            res.render(res.render('accueil', {port}));
        }
    });
});

//Appel de la page 404
app.use(function (request, response) {
    response.status(404).sendFile(__dirname + '/resources/static/assets/images/404.jpg')
});

//Personnalise erreur 500
app.use(function(err, request, response, next) {
    console.log(err);
    response.status(500).sendFile(__dirname + '/resources/static/assets/images/500.jpg')
});

app.listen(port);

