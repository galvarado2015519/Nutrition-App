'use strict'

const Doctor = require('../models/Doctor.model');
const bcrypt = require('bcrypt-nodejs');

/*
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(){

        }else{
            
        }
*/

function saveDoctor(req, res) {
    
    const doctor = new Doctor();
    const body = req.body;

    Doctor.findOne({'perfile.email': body.email},(err,doctorRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(doctorRepeat){
            res.status(403).send({message:"Este correo ya esta registrado, pruebe con otro"});
        }else{
            doctor.perfile.name = body.name;
            doctor.perfile.matricula = body.matricula;
            doctor.perfile.email = body.email;
            doctor.perfile.telephone = body.telephone;
            
            bcrypt.hash(body.password, null, null, (err, passwordEncrypt)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, error: "+ err});
                }else if(passwordEncrypt){
                    doctor.perfile.password = passwordEncrypt;

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
            })
        }
    })

}

function updateDoctor(req, res) {
    
    const body = req.body;
    const id = req.params.id;

    Doctor.findById(id,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){
            Doctor.findOneAndUpdate(id,body,{new:true},(err,doctorUpdate)=>{
                if(err){
                    res.status(500).send({message:"1. Error general del servidor, err: " + err});
                }else if(doctorUpdate){
                    res.status(200).send({Doctor: doctorUpdate})
                }else{
                    res.status(403).send({message:"No se pudo registrar al doctor"});
                }
            })
        }else{
            res.status(404).send({message:"No se encontro al doctor registrado"});
        }
    })
}

function viewDoctor(req, res) {
    
    const idD = req.params.id;

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

module.exports = {
    saveDoctor,
    updateDoctor,
    viewDoctor,
    deleteDoctor,
    viewDoctors 
}
