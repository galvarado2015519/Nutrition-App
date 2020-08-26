'use strict'
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// Rutas
const doctorRoute = require('./routes/Doctor.route');
const patientRoute = require('./routes/Patient.route');
const menuRoute = require('./routes/Menu.route');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/* Le indico a express las terminaciones de las rutas que voy a utilizar conjunto a las rutas
   Ejem: http://localhost:3800/doctor/saveDoctor
   despues de 'localhost:3800'/ va el '/doctor' que se definio en:
        app.use('/doctor',`doctorRoute`)
    importado de las constante donde importe la ruta:
        `doctorRoute` 
    */ 
app.use('/doctors',doctorRoute);
app.use('/patients',patientRoute);
app.use('/menus',menuRoute);

module.exports = app;