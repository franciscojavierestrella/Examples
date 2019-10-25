'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Cargamos las rutas
var userRoutes = require('./routes/user');
var animalRoutes = require('./routes/animal');

//Middleware de bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurar cabeceras y Coors
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas body-parser
app.use('/api', userRoutes);
app.use('/api', animalRoutes);

//Exportar el modulo
module.exports = app;
