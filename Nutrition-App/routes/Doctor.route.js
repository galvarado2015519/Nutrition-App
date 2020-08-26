'use strict'

let doctorController = require('../controllers/Doctor.controller');
let express = require('express');
let api = express.Router();

api.post('/', doctorController.saveDoctor);
api.put('/:id', doctorController.updateDoctor);
api.get('/:id', doctorController.viewDoctor);
api.delete('/:id', doctorController.deleteDoctor);

api.get('/', doctorController.viewDoctors);

module.exports = api;