'use strict'

var express = require('express');
var app = express();
var usercontroller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './src/uploads/users'});

// método con autenticación basada en token.
api.get('/pruebas-del-controlador', md_auth.ensureAuth, usercontroller.pruebas);
api.post('/register', usercontroller.saveUser);
api.post('/login', usercontroller.login);
api.put('/updateUser/:id', md_auth.ensureAuth, usercontroller.updateUser);
api.post('/uploadImage/:id', [md_auth.ensureAuth, md_upload], usercontroller.uploadImage);
api.get('/getImageFile/:imagefile',  usercontroller.getImageFile);
api.get('/Keepers',  usercontroller.getKeepers);

module.exports = api;