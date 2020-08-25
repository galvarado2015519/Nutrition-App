'use strict'

const Patient = require('../models/Patient.model');
const bcrypt = require('bcrypt-nodejs');

/*
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(){

        }else{
            
        }
*/

function savePatient(req, res) {
    
    const patient = new Patient();
    const body = req.body;

    Patient.findOne({'perfile.email': body.email},(err,patientRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(patientRepeat){
            res.status(403).send({message:"Este correo ya esta registrado, pruebe con otro"});
        }else{
            patient.perfile.name = body.name;
            patient.perfile.username = body.username;
            patient.perfile.email = body.email;
            patient.perfile.telephone = body.telephone;
            
            //Pendiente para cuando se cree el middleware

            patient.menu.type; 
            patient.menu.breakfast;
            patient.menu.lunch;
            patient.menu.price;
            patient.menu.refaction;

            patient.ailment.description = body.ailment;

            bcrypt.hash(body.password, null, null, (err, passwordEncrypt)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, error: "+ err});
                }else if(passwordEncrypt){
                    patient.perfile.password = passwordEncrypt;

                    patient.save((err, patientSave)=>{
                        if(err){
                            res.status(500).send({message:"3. Error general del servidor, error: " + err});
                        }else if(patientSave){
                            res.status(200).send({message: patientSave});
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

function updatePatient(req, res) {
    
    const body = req.body;
    const idP = req.params.id;

    Patient.findById(idP,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){
            Patient.findOneAndUpdate(idP,body,{new:true},(err,patientUpdate)=>{
                if(err){
                    res.status(500).send({message:"1. Error general del servidor, err: " + err});
                }else if(patientUpdate){
                    res.status(200).send({Paciente: patientUpdate})
                }else{
                    res.status(403).send({message:"No se pudo registrar al paciente"});
                }
            });
        }else{
            res.status(404).send({message:"No se encontro al paciente, por lo que no se pueden actualizar sus datos"});
        }
    });
}

function viewPatient(req, res) {
    
    const idP = req.params.id;

    Patient.findById(idP,(err,patientFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(patientFind){
            res.status(200).send({Doctor: patientFind});
        }else{
            res.status(404).send({Doctor:"No hay ningún paciente registrado con este nombre"});
        }
    });
}

function viewPatients(req,res) {
    Patient.find(( err, findPatients )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(findPatients){
            res.status(200).send({Pacientes:findPatients});
        }else{
            res.status(404).send({message:"No se encontro ningún paciente registrado"});
        }
    });
}

function deletePatient(req, res) {
    
    var idP = req.params.id;

    Patient.findByIdAndRemove(idP, ( err, patientRemove )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(patientRemove){
            res.status(200).send({message:"Paciente eliminado"});
        }else{
            res.status(404).send({message:"No se encontro al paciente"});
        }
    });
}

module.exports = {
    savePatient,
    updatePatient,
    viewPatient,
    deletePatient,
    viewPatients 
}
