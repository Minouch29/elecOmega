import express from "express";
import path from 'path';

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'resources/static/'));
app.set('view engine', 'ejs');

app.use('/', express.static('src/resources/static'));

app.get('/', (req, res) => res.render('accueil', {port}));

app.get('/installations', (req, res) => res.render('installations'));
app.get('/depannage', (req, res) => res.render('depannage'));
app.get('/maintenance', (req, res) => res.render('maintenance'));

app.get('/contact', (req, res) => res.render('contact'));
app.get('/reservations', (req, res) => res.render('reservations'));

//Appel de la page 404
app.use(function (request, response) {
    response.status(404).sendFile(__dirname + '/resources/static/assets/images/404.jpg')
});

//Personnalise erreur 500
app.use(function(err, request, response, next) {
    console.log(err);
    response.status(500).sendFile(__dirname + 'resources/static/assets/500.jpg')
});


app.get('/mentionLegales', (req, res) => res.render('mentionLegales'));

app.listen(port);

