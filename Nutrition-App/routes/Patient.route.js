'use strict'

let patientController = require('../controllers/Patient.controller');
let express = require('express');
let api = express.Router();

api.post('/savePatient', patientController.savePatient);
api.put('/updatePatient', patientController.updatePatient);
api.get('/viewPatient', patientController.viewPatient);
api.delete('/deletePatient', patientController.deletePatient);

module.exports = api;