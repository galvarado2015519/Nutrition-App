'use strict'

let patientController = require('../controllers/Patient.controller');
let express = require('express');
let api = express.Router();

api.post('/savePatient', patientController.savePatient);
api.put('/updatePatient/:id', patientController.updatePatient);
api.get('/viewPatient/:id', patientController.viewPatient);
api.delete('/deletePatient/:id', patientController.deletePatient);

api.get('/viewPacients', patientController.viewPatients);
module.exports = api;