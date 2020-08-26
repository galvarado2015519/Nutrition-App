'use strict'

let patientController = require('../controllers/Patient.controller');
let express = require('express');
let api = express.Router();

api.post('/', patientController.savePatient);
api.put('/:id', patientController.updatePatient);
api.get('/:id', patientController.viewPatient);
api.delete('/:id', patientController.deletePatient);

api.get('/', patientController.viewPatients);

module.exports = api;