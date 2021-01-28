import mysql from 'mysql';
import Importer from 'mysql-import';

const confMySql = {
    host: "localhost",
    user: "root",
    password: "ghislaine82"
};

const db = mysql.createConnection(confMySql);

const createDatabase = (success, error) => {
    console.log("Ready to create database");
    const importer = new Importer(confMySql);
    importer.import('./elecomegadb.sql').then(
        () => {
            console.log("Database created");
            db.query(
                "USE elecomegadb",
                (err, result) => {
                    if(err) {
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

//insertion des données dans la base de données
const insertData = (data) =>{
  const sql = `INSERT INTO utilisateurs (id_user, firstName, name_user, email_user, message) VALUES (
    NULL,
    "${data.name}",
    "${data.firstName}",
    "${data.email}",
    "${data.message}"
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
        if(err) {
            error(err);
            return;
        } 
        db.query(
          "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'elecomegadb'",
          (err, result) => {
            if(err) {
                error(err);
                returnno;
            }
            if (result.length) {
              console.log('Database already exist, USE IT !!!');
              db.query(
                "USE elecomegadb",
                (err, result) => {
                    success();
                }
              );
            }else {
              createDatabase(success, error);
            }
          }
        );
      }
    );
  }

export default loadDataBase;
export {insertData, getData}
