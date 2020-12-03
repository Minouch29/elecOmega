import express from "express";

const app = express();
const port = 8888;

app.use('/', express.static('src/resources/static'));

app.listen(port, () => console.log(`Mon premier serveur node avec express sur le port ${port}`));

