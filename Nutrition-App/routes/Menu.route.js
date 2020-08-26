'use strict'

let menuController = require('../controllers/Menu.controller');
let express = require('express');
let api = express.Router();

api.post('/', menuController.saveMenu);
api.put('/:id', menuController.updateMenu);
api.get('/:id', menuController.viewMenu);
api.delete('/:id', menuController.deleteMenu);

api.get('/', menuController.viewMenus);

module.exports = api;