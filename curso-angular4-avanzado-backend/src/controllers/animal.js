'use strict'

//modulos
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');
var Animal = require('../models/animal');

// servicios

//Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando controlador de pruebas',
        user: req.user
    });
}

function saveAnimal(req, res){
    var animal = new Animal();
    var params = req.body;

    if ( params.name)
    {
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStore) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }
            else{
                if(animalStore){
                    res.status(200).send({message: 'Animal guardado', animal: animalStore});
                }
                else{
                    res.status(404).send({message: 'Animal no guardado'});
                }
            }
        });

    }
    else{
        res.status(404).send({message: 'Error en parametros del animal (nombre obligatorio)'});
    }
}

function getAnimals(req, res){

    Animal.find({}).populate({path: 'user'}).exec((err,animals) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(animals){
                res.status(200).send({message: 'Animal guardado', animales: animals});
            }
            else{
                res.status(404).send({message: 'No hay animales cargados'});
            }
        }
    });
}

function getAnimal(req, res){

    var animalId = req.params.id;

    Animal.findById(animalId).populate({path: 'user'}).exec((err,animalStore) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(animalStore){
                res.status(200).send({message: 'Animal recogido', animalStore: animalStore});
            }
            else{
                res.status(404).send({message: 'No hay animales cargados'});
            }
        }
    });
}

function updateAnimal(req, res){
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, {new: true}, (err, animalUpdate) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(animalUpdate){
                res.status(200).send({message: 'Animal modificado', animalUpdate: animalUpdate});
            }
            else{
                res.status(404).send({message: 'No se ha actualizado el animal'});
            }
        }
    });
}

function uploadImage(req, res){
    var animalId = req.params.id;
    var filename = "No Subido"; 

    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split("\\");
        filename = fileSplit[3];

        var ext_split = filename.split('.');
        var file_ext = ext_split[1];

        if (file_ext =='png' || file_ext =='jpeg' || file_ext =='gif' || file_ext =='jpg'){
            Animal.findByIdAndUpdate(animalId, {image: filename}, {new: true}, (err,animalUpdate) => {
                if (err){
                    res.status(500).send({message: 'Error al actualizar el usuario'});
                }
                else{
                    if (!animalUpdate){
                        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                    }
                    else{
                        res.status(200).send({animal: animalUpdate,
                            image: filename,
                            message: 'Actualizado el usuario'});
                    }
                }
            });
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
    var path_file = './src/uploads/animals/'+imageFile;

    fs.exists(path_file, function(exits){
        if(exits){
            resp.sendfile(path.resolve(path_file));
        }
        else{
            resp.status(404).send({message: 'La imagen no existe'});
        }
    })
}


function deleteAnimal(req, res){
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err,animalRemoved) => {
        if (err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if (!animalRemoved){
                res.status(404).send({message: 'No se ha podido borrar el animal'});
            }
            else{
                res.status(200).send({animal: animalRemoved,                    
                    message: 'Animal Borrado'});
            }
        }
    });
}

//Exportamos el modulo
module.exports = {
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAnimal
}