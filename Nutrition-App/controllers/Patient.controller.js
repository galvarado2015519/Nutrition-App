'use strict'

const Patient = require('../models/Patient.model');
const bcrypt = require('bcrypt-nodejs');

// Funciones para guardar los pacientes
function savePatient(req, res) {
    
    // importo el modelo de Pacientes y en la const "body" referencio el cuerpo de las peticiones
    const patient = new Patient();
    const body = req.body;

    /* Busco en la base de datos un usuario que tenga el correo que se acaba de ingresar
        Si lo encontro le dira que ese correo ya esta registrado*/
    Patient.findOne({'perfile.email': body.email},(err,patientRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(patientRepeat){
            res.status(403).send({message:"Este correo ya esta registrado, pruebe con otro"});
        }else{

            // En la const que cree para referenciar el modelo. Le agrego los valores uno por uno

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

            //Encripto la contraseña
            bcrypt.hash(body.password, null, null, (err, passwordEncrypt)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, error: "+ err});
                }else if(passwordEncrypt){
                    patient.perfile.password = passwordEncrypt;

                    //Guardo el paciente 
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
    
    /* Creo dos constantes:
     1. "body" referencia el cuerpo de la aplicación
     2. "idP" referencia la URI y recibe el id que mande*/
    const body = req.body;
    const idP = req.params.id;

    //Busca en la base de datos el usuario con el id que recibio en la URI
    Patient.findById(idP,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){

            // Actualizar el usuario que que encontro
            Patient.findByIdAndUpdate(idP,body,{new:true},(err,patientUpdate)=>{
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

//Busca un usuario por su ID
function viewPatient(req, res) {
    
    const idP = req.params.id;

    Patient.findById(idP,(err,patientFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(patientFind){
            res.status(200).send({Paciente: patientFind});
        }else{
            res.status(404).send({message:"No hay ningún paciente registrado con este nombre"});
        }
    });
}

// Busca todos los pacientes que existen
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

// Borro un paciente por su Id
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

//Exporto los modulos de las funciones que cree para poder usarlas en las rutas
module.exports = {
    savePatient,
    updatePatient,
    viewPatient,
    deletePatient,
    viewPatients 
}
