// importe le module express
const express = require("express");

//importe le module url
const url = require('url');

//importe le module fs
const fs = require('fs');

// importer la base de données mysql2
const mysql2 = require('mysql2');

// relier la base de données et le nodejs
const myConnection = require('express-myconnection');

// indiquer les étapes pour accéder à la base de données
const connection = {
    host : "localhost",
    user : "root",
    password : "ch14fz03",
    port : 3306,
    database : "projetcb"
};

//utiliser la fonction app pour importer le module express
const app = express();

// l'endroit où se situe les vues qui s'affichent sur le naviagteur
app.set("views", "./views");

// préciser le moteur de la lecture de vues à savoir esj
app.set("view engine", "ejs");

// précise le répertoire 'public' qui contient le fichier statics
app.use(express.static("prive"));

// recupère la base de données
app.use(myConnection(mysql2, connection, "pool"));

// Extraire des données du formulaire
app.use(express.urlencoded({extended: false} ));



//utilise la route GET
app.get("/", (req, res) => {
    res.end("le serveur fonctionne");
});

// utilise la route GET qui mène à accueil
app.get("/accueil", (req, res) => {

   res.render("accueil");
});
    
// utilise la route GET qui mène à connexion
app.get("/connexion", (req, res) => {

// récupère les éléments de la base de données depuis nodejs  
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM client", [], (err, resultat) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Mission réussie", resultat);
                    res.render("connexion");
                }
            });
        };
    });
    
 });



 // utilise la route GET qui mène à premiereconnexion
app.get("/premiereconnexion", (req, res) => {

    res.render("premiereconnexion");
 });
    
 // utilise la route GET qui mène à contact
app.get("/contact", (req, res) => {

    res.render("contact");
 });

 // utilise la route GET qui mène à equipe
app.get("/equipe", (req, res) => {

    objetEquipe = {
        pdg : ["Travis Scott", "Kendrick Lamar"]
    }

    res.render("equipe", objetEquipe);
 });

//exporter la fonction app
module.exports = app;