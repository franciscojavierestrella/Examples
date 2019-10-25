'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');

// servicios
var jwt = require('../services/jwt');

//Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando controlador de pruebas',
        user: req.user
    });
}

function saveUser(req, res){
    
    var user = new User();

    var params = req.body;  
    console.log(params);
    if (  params.password && params.surname){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = params.role;

        User.findOne({email: user.email.toLowerCase() }, (err,userFind) => {
            if (err){
                    res.status(500).send({message: 'Error al comprobar el usuario'});
            }
            else{
                if(!userFind){
                    bcrypt.hash(params.password,null,null, function( err, hash){
                        user.password = hash;
                        user.save((err, userStore) => {
                            if (err){
                                res.status(500).send({message: 'Error al grabar el usuario'});
                            }
                            else{
                                if(!userStore){
                                    res.status(404).send({message: 'No se ha registrado correctamente'});
                                }
                                else{
                                    res.status(200).send({message: 'Usuario Registrado', user: userStore});
                                }
                            }            
                        })
                    });
                }
                else{
                    res.status(200).send({message: 'Ya existe el usuario'});
                }
            }
        });

    }
}

function login(req, res){
    var params = req.body;
    
    var email = params.email;
    var password = params.password;

    var user = new User();

    User.findOne({email: email.toLowerCase() }, (err,userFind) => {
        if (err){
                res.status(500).send({error: 'Error al comprobar el usuario'});
        }
        else{
            console.log(userFind);
            if(userFind){
                bcrypt.compare(password, userFind.password, (err, result) => {
                    if (result){

                        //Comprobamos y generamos el token
                        if (params.gettoken){
                            res.status(200).send({token: jwt.createToken(userFind)});
                        }
                        else{
                            res.status(200).send({user: userFind});
                        }                                
                    }
                    else{
                        res.status(404).send({error: 'El usuario no ha podido logarse' });
                    }
                });                      
            }
            else{
                res.status(404).send({error: 'El usuario no existe' });
            }
        }
    });    
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    if (userId != req.user.sub){
        return res.status(500).send({message: 'No tiene permisos para actualizar el usuario' });
    }
    else{
        User.findByIdAndUpdate(userId, update, {new: true}, (err,userUpdate) => {
            if (err){
                res.status(500).send({message: 'Error al actualizar el usuario'});
            }
            else{
                if (!userUpdate){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }
                else{
                    res.status(200).send({user: userUpdate,
                        message: 'Actualizado el usuario'});
                }
            }
        });
    }
}

function uploadImage(req, res){
    var userId = req.params.id;
    var filename = "No Subido"; 
    var userId = req.params.id;

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split("\\");
        filename = fileSplit[3];

        var ext_split = filename.split('.');
        var file_ext = ext_split[1];

        console.log(filename);

        if (file_ext =='png' || file_ext =='jpeg' || file_ext =='gif' || file_ext =='jpg'){
            if (userId != req.user.sub){
                    return res.status(500).send({message: 'No tiene permisos para actualizar el usuario' });
            }
            else{
                User.findByIdAndUpdate(userId, {image: filename}, {new: true}, (err,userUpdate) => {
                    if (err){
                        res.status(500).send({message: 'Error al actualizar el usuario'});
                    }
                    else{
                        if (!userUpdate){
                            res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                        }
                        else{
                            res.status(200).send({user: userUpdate,
                                image: filename,
                                message: 'Actualizado el usuario'});
                        }
                    }
                });
            }
        }
        else{
            fs.unlink(filePath, (err) => {
                if(err){
                    res.status(500).send({message: 'Error al procesar una imagen no valida'});
                }
                else{
                    res.status(200).send({message: 'Extensión del archivo no valida'});
                }
            });
        }
    }
    else{
        res.status(200).send({message: 'No se han subido archivos'});
    }    
}

function getImageFile(req, resp){
    var imageFile = req.params.imagefile;
    var path_file = './src/uploads/users/'+imageFile;

    fs.exists(path_file, function(exits){
        if(exits){
            resp.sendfile(path.resolve(path_file));
        }
        else{
            resp.status(404).send({message: 'La imagen no existe'});
        }
    })
}

function getKeepers(req, resp){

    User.find({role: 'ROLE_ADMIN'}).exec( (err, users) => {
        if(err){
            resp.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!users){
                resp.status(404).send({message: 'No existen Cuidadores'});
            }
            else{
                resp.status(200).send({users});
            }
        }
    });
}

//Exportamos el modulo
module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
}