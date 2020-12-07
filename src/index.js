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
app.get('/reservation', (req, res) => res.render('reservation'));

app.listen(port);

