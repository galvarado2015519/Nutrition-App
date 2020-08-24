'use strict'

function saveDoctor(req, res) {
    return console.log('Guardar')
}

function updateDoctor(req, res) {
    return console.log('Actualizar')
}

function viewDoctor(req, res) {
    return console.log('Ver')
}

function deleteDoctor(req, res) {
    return console.log('Delete')
}

module.exports = {
    saveDoctor,
    updateDoctor,
    viewDoctor,
    deleteDoctor
}
