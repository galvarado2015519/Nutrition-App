'use strict'

const Menu = require('../models/Menu.model');
const bcrypt = require('bcrypt-nodejs');

/*
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(){

        }else{
            
        }
*/

function saveMenu(req, res) {
    
    const menu = new Menu();
    const body = req.body;
    const idMenu = req.params.id;

    Menu.findById(idMenu,(err,menuRepeat)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, error: "+err});
        }else if(menuRepeat){
            res.status(403).send({message:"Este menu ya existe, realize otro o busque el que ya creo"});
        }else{
            
            menu.idDoctor;
            
            menu.breakfast.time = Date(body.breakfasttime);
            menu.breakfast.food = body.breakfastfood;

            menu.lunch.time = Date(body.lunchtime);
            menu.lunch.food = body.lunchfood;

            menu.price.time = Date(body.pricetime);
            menu.price.food = body.pricefood;


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
    
    const body = req.body;
    const idM = req.params.id;

    Menu.findById(idM,(err,doc)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doc){
            Menu.findOneAndUpdate(idM,body,{new:true},(err,menuUpdate)=>{
                if(err){
                    res.status(500).send({message:"2. Error general del servidor, err: " + err});
                }else if(menuUpdate){
                    res.status(200).send({Doctor: menuUpdate})
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
    
    const idM = req.params.id;

    Menu.findById(idM,(err,doctorFind)=>{
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(doctorFind){
            res.status(200).send({Doctor: doctorFind});
        }else{
            res.status(404).send({Doctor:"No hay ningún menu registrado con estas especificaciones"});
        }
    });
}

function viewMenus(req,res) {
    
    // Que por medio del id del doctor se busquen los menus que el creo

    Menu.find(( err, findMenus )=> {
        if(err){
            res.status(500).send({message:"1. Error general del servidor, err: " + err});
        }else if(findMenus){
            res.status(200).send({doctors:findMenus});
        }else{
            res.status(404).send({message:"No hay menus"});
        }
    });
}

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

module.exports = {
    saveMenu,
    updateMenu,
    viewMenu,
    deleteMenu,
    viewMenus 
}