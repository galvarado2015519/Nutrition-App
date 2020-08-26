'use strict'

/*Importo mongoose, asigno el puerto a una varialbe e importo el archivo app que tiene
    las configuariones de express*/
let mongoose = require('mongoose');
let port = 3800;
let app = require('./app');

//Creo una promesa global
mongoose.Promise = global.Promise;

/*Conecto con la base de datos.*/
mongoose.connect('mongodb://localhost:27017/DBHotel', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false})
    .then(()=>{
        console.log('Conexion a la base de datos correcta');
        //Le indico por express donde tiene que correr el servidor
        app.listen(port,()=>{
            console.log('El servidor esta corriendo en el puerto: '+port);
        })
    }).catch(err =>{
        console.log('Error al conectarse a la base de datos, error: ' +err);
    })

module.exports = app;