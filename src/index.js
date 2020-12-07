import express from "express";
import path from 'path';

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'resources/static/'));
app.set('view engine', 'ejs');

app.use('/', express.static('src/resources/static'));

app.get('/', (req, res) => res.render('accueil', {port}));

app.listen(port);

