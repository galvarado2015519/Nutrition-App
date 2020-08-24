'use strict'

let menuController = require('../controllers/Menu.controller');
let express = require('express');
let api = express.Router();

api.post('/saveMenu', menuController.saveMenu);
api.put('/updateMenu', menuController.updateMenu);
api.get('/viewMenu', menuController.viewMenu);
api.delete('/deleteMenu', menuController.deleteMenu);

module.exports = api;