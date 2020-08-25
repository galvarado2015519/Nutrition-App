'use strict'

let doctorController = require('../controllers/Doctor.controller');
let express = require('express');
let api = express.Router();

api.post('/saveDoctor', doctorController.saveDoctor);
api.put('/updateDoctor/:id', doctorController.updateDoctor);
api.get('/viewDoctor/:id', doctorController.viewDoctor);
api.delete('/deleteDoctor/:id', doctorController.deleteDoctor);

api.get('/viewDoctors', doctorController.viewDoctors);

module.exports = api;