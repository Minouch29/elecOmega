import mysql from 'mysql';
import Importer from 'mysql-import';

const confMySql = {
  host: "localhost",
  user: "root",
  password: ""
};

const db = mysql.createConnection(confMySql);
/*
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
*/

const createDatabase = (success, error) => {
  console.log("Ready to create database");
  const importer = new Importer(confMySql);
  importer.import('src/bd/basededonnee.sql').then(
    () => {
      console.log("Database created");
      db.query(
        "USE basededonnee.sql",
        (err, result) => {
          if (err) {
            error(err);
            return;
          }
        }
      );
    }
  ).catch(
    err => {
      error(err);
    }
  );
}

//insertion des données dans la table utilisateur
const insertDataUser = (data) => {
  const sql = `INSERT INTO utilisateurs (id_user,firstName,name_user,email_user,message) VALUES (Null,
    "${data.name}",
    "${data.prenom}",
    "${data.email}",
    "${data.object}"
  )`;

  db.query(sql);
};



// recupération des données de la base de données
const getData = () => {
  const sql = `SELECT 
    utilisateurs.name_user,
    utilisateurs.firstName,
    utilisateurs.email_user,
    utilisateurs.message
    FROM utilisateurs`;
    
  return new Promise(
    (resolve, reject) => {
      db.query(sql, (err, result) => {
        if(err) reject(err);
        resolve({utilisateurs: result});
      });
    }
  );
}



const loadDataBase = (success, error) => {
  db.connect(
    (err) => {
      if (err) {
        error(err);
        return;
      }
      db.query(
        "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'elecomegadb'",
        (err, result) => {
          if (err) {
            error(err);
            return;
          }
          if (result.length) {
            console.log('Database already exist, USE IT !!!');
            db.query(
              "USE elecomegadb",
              (err, result) => {
                success();
              }
            );
          } else {
            createDatabase(success, error);
          }
        }
      );
    }
  );
}

export default loadDataBase;
export { insertDataUser}
export {getData }

