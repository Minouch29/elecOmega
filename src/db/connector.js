import mysql from 'mysql';

const confMySql = {
    host: "localhost",
    user: "root",
    password: "ghislaine82"
};

const db = mysql.createConnection(confMySql);

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});