'use strict'

const Menu = require('../models/Menu.model');
const bcrypt = require('bcrypt-nodejs');

// Guardar un menu
function saveMenu(req, res) {
    
    /*Creo un objeto del modelo,
     referencio el body con la const "body"
     referencio la URI y pido el id en la const "idMenu"*/
    const menu = new Menu();
    const body = req.body;
    const idMenu = req.params.id;

    //Busco por el id que el menu no este repetido
    Menu.findById(idMenu,(err,menuRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(menuRepeat){
            res.status(403).send({message:"Este menu ya existe, realize otro o busque el que ya creo"});
        }else{
            
            /* Asigno los valores al objeto que cree del modelo */
            menu.idDoctor;
            
            menu.breakfast.time = Date(body.breakfasttime);
            menu.breakfast.food = body.breakfastfood;

            menu.lunch.time = Date(body.lunchtime);
            menu.lunch.food = body.lunchfood;

            menu.price.time = Date(body.pricetime);
            menu.price.food = body.pricefood;

            // Guardo el menu en la base de datos
            menu.save((err, menuSave)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, err: " + err});
                }else if(menuSave){
                    res.status(200).send({menu:menuSave});
                }else{
                    res.status(400).send({message:"No se logro guardar el menu"});
                }
            });
        }
    });

}

function updateMenu(req, res) {
    
    //Referencio el cuerpo y el id de la URI a tráves de las constantes 'body' , 'idM' respectivamente
    const body = req.body;
    const idM = req.params.id;

    // Busca el menu por su id
    Menu.findById(idM,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){
            //Actualiza el menu por su Id
            Menu.findByIdAndUpdate(idM,body,{new:true},(err,menuUpdate)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, err: " + err});
                }else if(menuUpdate){
                    res.status(200).send({Menu: menuUpdate})
                }else{
                    res.status(403).send({message:"No se pudo guardar el menu"});
                }
            });
        }else{
            res.status(404).send({message:"No se encontro este menu en la base de datos"});
        }
    })
}

function viewMenu(req, res) {
    
    // Busco el menu por su id
    const idM = req.params.id;

    Menu.findById(idM,(err,menuFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(menuFind){
            res.status(200).send({Menu: menuFind});
        }else{
            res.status(404).send({message:"No hay ningún menu registrado con estas especificaciones"});
        }
    });
}

// Miro los menus de la base de datos
function viewMenus(req,res) {
    
    // Que por medio del id del doctor se busquen los menus que el creo

    Menu.find(( err, findMenus )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(findMenus){
            res.status(200).send({Menus:findMenus});
        }else{
            res.status(404).send({message:"No hay menus"});
        }
    });
}

// Funcion que elemina el menu por Id
function deleteMenu(req, res) {
    
    // Validar que solo en nutriologo pueda borrar el menu
    // Se hace con el middleware

    var idM = req.params.id;

    Menu.findByIdAndRemove(idM, ( err, menuRemove )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(menuRemove){
            res.status(200).send({message:"Menu eliminado"});
        }else{
            res.status(404).send({message:"No se encontro menu que desea eliminar"});
        }
    });
}

//Importa las funciones para utilizarlos en las rutas que se crearon en su respectivo archivo
module.exports = {
    saveMenu,
    updateMenu,
    viewMenu,
    deleteMenu,
    viewMenus 
}