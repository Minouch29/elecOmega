import express, { response } from "express";
import path from "path";
import bodyParser from 'body-parser';
import loadDataBase, { insertDataUser, getData } from './bd/connector';
import nodemailer from "nodemailer";

const app = express();
const port = 8080;


const success = () => {
    app.set('views', path.join(__dirname, 'resources/static/ejs'));
    app.set('view engine', 'ejs');

    app.use('/', express.static('src/resources/static'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.get('/', (req, res) => res.render('accueil', { port }));


    app.get('/installations', (req, res) => res.render('installations'));
    app.get('/depannage', (req, res) => res.render('depannage'));
    app.get('/maintenance', (req, res) => res.render('maintenance'));
    app.get('/piscines', (req, res) => res.render('piscines'));

    app.get('/contact', (req, res) => res.render('contact'));

    app.get('/reservation', (req, res) => res.render('reservation'));

    app.get('/mentionLegales', (req, res) => res.render('mentionLegales'));

    //app.get('/apiReservation', (req, res) => res.render('apiReservation'));

    app.get('/apiClient', (req, res) => res.render('apiClient'));

    /*
       app.post('/reservation', async (req, res) => {
           const data = {
               nom: req.body.nom,
               prenom: req.body.prenom,
               telephone: req.body.phone,
               email: req.body.email
           };
   
           const dataDB = await insertDataUser(data);
          
   
           res.status(200).render('accueil', { port });
   
       });
      
   */

    app.post('/contact', async (req, res) => {
        const data = {
            name: req.body.name,
            prenom: req.body.prenom,
            email: req.body.email,
            object: req.body.object
        };

        const dataDB = await insertDataUser(data);


        res.status(200).render('accueil', { port });

    });

    /*
   // nodemailer via hebergement 
   let transporter = nodemailer.createTransport({
     host: "ftp.cluster028.hosting.ovh.net",
     port: 21,
     secure: false, // true for 465, false for other ports
     auth: {
       user: elecomu, // generated ethereal user
       pass: UfM33f3NAZKK, // generated ethereal password
     },
   });
   
 //test notification nodeMailer

 const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
         user: 'elecomegakr.com',
         pass: 'moDePasseElecomega'
     }
 });

 app.post('/contact', async (req, res) => {
     const response = {
         name: req.body.name,
         prenom: req.body.prenom,
         email: req.body.email,
         object: req.body.object
     };


     const mailOptions = {
         from: response.mail,
         to: '',
         subject: 'Message de ' + response.name + ' ' + response.prenom,
         text: 'Email:' + response.email + 'Message:' + response.object
     };

     transporter.sendMail(mailOptions, function (err, infos) {
         if (err) {
             console.log(err);
         } else {
             console.log('Email sent:' + infos.response);
             res.render('accueil', { port });
         }
     });


     res.status(200).render('accueil', { port });

 });



 
 app.get('/apiClient', async (req, res) => {
     const data = {
         name: req.body.name,
         prenom: req.body.prenom,
         email: req.body.email,
         object: req.body.object
     };

     const dataDB = await getData(data);
    

     res.status(200).render('apiClient',{dataDB},{ port });

 });
 
 
*/
    //Appel de la page 404
    app.use(function (request, response) {
        response.status(404).sendFile(__dirname + '/resources/static/assets/images/404.png')
    });

    //Personnalise erreur 500
    app.use(function (err, request, response, next) {
        console.log(err);
        response.status(500).sendFile(__dirname + '/resources/static/assets/images/erreur500.png')
    });


    app.listen(port);
}






loadDataBase(
    success,
    (err) => console.log("Cannot start server !!!", err)
);



