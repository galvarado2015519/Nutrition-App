'use strict'

let doctorController = require('../controllers/Doctor.controller');
let express = require('express');
let api = express.Router();

api.post('/saveDoctor', doctorController.saveDoctor);
api.put('/updateDoctor', doctorController.updateDoctor);
api.get('/viewDoctor', doctorController.viewDoctor);
api.delete('/deleteDoctor', doctorController.deleteDoctor);

module.exports = api;