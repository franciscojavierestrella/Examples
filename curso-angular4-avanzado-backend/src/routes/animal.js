'use strict'

var express = require('express');
var app = express();
var animalcontroller = require('../controllers/animal');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');
var md_admin = require('../middlewares/isAdmin');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './src/uploads/animals'});

// método con autenticación basada en token.
api.get('/pruebas-animales', md_auth.ensureAuth, animalcontroller.pruebas);
api.post('/saveanimal', [md_auth.ensureAuth, md_admin.isAdmin], animalcontroller.saveAnimal);
api.get('/getanimals',  animalcontroller.getAnimals);
api.get('/getanimal/:id',  animalcontroller.getAnimal);
api.put('/updateAnimal/:id', [md_auth.ensureAuth, md_admin.isAdmin], animalcontroller.updateAnimal);
api.post('/uploadImageAnimal/:id', [md_auth.ensureAuth, md_upload, md_admin.isAdmin], animalcontroller.uploadImage);
api.get('/getImageFileAnimal/:imagefile',  animalcontroller.getImageFile);
api.delete('/deleteAnimal/:id', [md_auth.ensureAuth, md_admin.isAdmin], animalcontroller.deleteAnimal);


module.exports = api;