const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dir = "./upload";

const storage = multer.diskStorage({ //Where to store the files // Où stocker les fichiers

  destination: function (req, file, callback) { //utilisé pour déterminer dans quel dossier les fichiers téléchargés doivent être stockés
    //fonction pour ajouter des nouveaux files sans l'intégrer manuellement
    /************************/
    if (!fs.existsSync(dir)) { //used to synchronously check if a file already exists in the given path or not  // utilisé pour vérifier de manière synchrone si un fichier existe déjà dans le chemin donné ou non
      fs.mkdirSync(dir); //which provides an API for interacting with the file system  // qui fournit une API pour interagir avec le système de fichiers
    }
    callback(null, "./upload");
  },
  /***************************/
  filename: function (req, file, callback) { // utilisé pour déterminer le nom du fichier dans le dossier
    callback(null, Date.now() + '-' + file.originalname); //Nom du fichier sur l'ordinateur 
  },

});

const fileFilter = (req, file, callback) => {  //Function to control which files are accepted  // Fonction pour contrôler quels fichiers sont acceptés
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    "application/pdf"
  ) {
    //mimetype of the file
    callback(null, true);
  } else {
    callback(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });  //Multer is a node.js middleware for handling multipart/form-data, which is used for uploading files. // Multer est un middleware node. js pour la gestion de multipart/form-data, qui est utilisé pour le téléchargement de fichiers.
module.exports = upload;