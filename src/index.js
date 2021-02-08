import express, { response } from "express";
import path from 'path';
//import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import loadDataBase, {insertData} from './db/connector.js';

const success = () => {
    const app = express();
    const port = 8080;

    app.set('views', path.join(__dirname, 'resources/static/'));
    app.set('view engine', 'ejs');

    app.use('/', express.static('src/resources/static'));

    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json()); 

    app.get('/', (req, res) => res.render('accueil', {port}));

    app.get('/installations', (req, res) => res.render('installations'));
    app.get('/depannage', (req, res) => res.render('depannage'));
    app.get('/maintenance', (req, res) => res.render('maintenance'));

    app.get('/contact', (req, res) => res.render('contact'));

    app.get('/reservations', (req, res) => res.render('reservations'));

    app.get('/mentionLegales', (req, res) => res.render('mentionLegales'));

    app.get('/apiClient', (req, res) => res.render('apiClient'));

    /* // envoi données formulaire par mail via nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adressMailClient@gmail.com',
            pass: '********'
        }
    });

    app.post('/contact', (req, res) => {
        const response = {
            name: req.body.name,
            prenom: req.body.prenom,
            email: req.body.email,
            object: req.body.object
        };

        const mailOptions = {
            from: response.email,
            to: '',
            subject: 'Message de ' + response.name + ' ' + response.prenom,
            text: 'Email: ' + response.email + 'Message: ' + response.object
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log(error);
            }else {
                console.log('Email sent: ' + info.response);
                res.render('accueil', {port});
            }
        });
    });
    */

    app.post('/contact', async (req, res) => {
        const data = {
            name: req.body.name,
            firstName: req.body.prenom,
            email: req.body.email,
            message: req.body.object
          };
        
        const dataDB = await insertData(data);
        res.status(200).render('accueil', {port});
        
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
}

loadDataBase(
    success,
    (err) => console.log("Cannot start server !!!", err)
  );