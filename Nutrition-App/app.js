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

app.use('/doctor',doctorRoute);
app.use('/patient',patientRoute);
app.use('/menu',menuRoute);

module.exports = app;