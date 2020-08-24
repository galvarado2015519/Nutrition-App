'use strict'

let mongoose = require('mongoose');
let port = 3800;
let app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/DBHotel', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Conexion a la base de datos correcta');
        app.listen(port,()=>{
            console.log('El servidor esta corriendo en el puerto: '+port);
        })
    }).catch(err =>{
        console.log('Error al conectarse a la base de datos, error: ' +err);
    })

    module.exports = app;