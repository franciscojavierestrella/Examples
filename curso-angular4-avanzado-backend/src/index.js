'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3789;


mongoose.connect('mongodb://localhost:27017/zoo', (err, res) => {
  if(err){
    throw err;
  }
  else{
        console.log('Conexion a BD correcta....');
        app.listen(port, () => {
            console.log('Listening on port 3000!');
        });
    }
});
