'use strict'

const Doctor = require('../models/Doctor.model');
const bcrypt = require('bcrypt-nodejs');

// Funcion que guarda un doctor
function saveDoctor(req, res) {
    
    /*Creo un objeto que referencia el modelo de la base de datos: "doctor".
      Se referencia el body con la const "body".*/
    const doctor = new Doctor();
    const body = req.body;

    /*Busca un usuario que tenga registrado con el email ingresado por el usuario
      Si lo encuentra le dira que no puede registrarse con ese correo porque ya esta registrado*/
    Doctor.findOne({'perfile.email': body.email},(err,doctorRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(doctorRepeat){
            res.status(403).send({message:"Este correo ya esta registrado, pruebe con otro"});
        }else{

            //Se asignan los valores que se guardaran en la base de datos
            doctor.perfile.name = body.name;
            doctor.perfile.matricula = body.matricula;
            doctor.perfile.email = body.email;
            doctor.perfile.telephone = body.telephone;
            
            //Se encipta la constraseña del usuario
            bcrypt.hash(body.password, null, null, (err, passwordEncrypt)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, error: "+ err});
                }else if(passwordEncrypt){
                    doctor.perfile.password = passwordEncrypt;

                    //Se guarda el doctor en la base de datos
                    doctor.save((err, doctorSave)=>{
                        if(err){
                            res.status(500).send({message:"3. Error general del servidor, error: " + err});
                        }else if(doctorSave){
                            res.status(200).send({message: doctorSave});
                        }else{
                            res.status(400).send({message:"No se pudo registrar"});
                        }
                    });
                }else{
                    res.status(400).send({message:"No se pudo encriptar la contraseña"});
                }
            });
        }
    });
}

//Actualiza un doctor
function updateDoctor(req, res) {
    
    //Referencio el body. Referencio el id a través de la URI
    const body = req.body;
    const id = req.params.id;

    //Busco al doctor por su id
    Doctor.findById(id,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){
            //Actualizo al doctor por su id
            Doctor.findByIdAndUpdate(id,body,{new:true},(err,doctorUpdate)=>{
                if(err){
                    res.status(500).send({message:"1. Error general del servidor, err: " + err});
                }else if(doctorUpdate){
                    res.status(200).send({Doctor: doctorUpdate})
                }else{
                    res.status(403).send({message:"No se pudo registrar al doctor"});
                }
            });
        }else{
            res.status(404).send({message:"No se encontro al doctor registrado"});
        }
    });
}

// Busca un doctor 
function viewDoctor(req, res) {
    
    const idD = req.params.id;

    //Busca un doctor por su id
    Doctor.findById(idD,(err,doctorFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doctorFind){
            res.status(200).send({Doctor: doctorFind});
        }else{
            res.status(404).send({Doctor:"No hay ningún doctor registrado con este nombre"});
        }
    });
}

// Enlista los doctores registrados
function viewDoctors(req,res) {
    Doctor.find(( err, findDoctors )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(findDoctors){
            res.status(200).send({doctors:findDoctors});
        }else{
            res.status(404).send({message:"No se encontro al doctor registrado"});
        }
    });
}

// Elimina un doctor por su id
function deleteDoctor(req, res) {
    
    var idD = req.params.id;

    Doctor.findByIdAndRemove(idD, ( err, doctorRemove )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doctorRemove){
            res.status(200).send({message:"Doctor eliminado"});
        }else{
            res.status(404).send({message:"No se encontro al doctor registrado"});
        }
    });
}

// Se exportan las funciones para utilizarlas en el archivo de rutas
module.exports = {
    saveDoctor,
    updateDoctor,
    viewDoctor,
    deleteDoctor,
    viewDoctors 
}
