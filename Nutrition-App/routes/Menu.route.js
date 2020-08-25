'use strict'

let menuController = require('../controllers/Menu.controller');
let express = require('express');
let api = express.Router();

api.post('/saveMenu', menuController.saveMenu);
api.put('/updateMenu/:id', menuController.updateMenu);
api.get('/viewMenu/:id', menuController.viewMenu);
api.delete('/deleteMenu/:id', menuController.deleteMenu);

api.get('/viewMenus', menuController.viewMenus);
module.exports = api;