'use strict'

function savePatient(req, res) {
    return console.log('Guardar')
}

function updatePatient(req, res) {
    return console.log('Actualizar')
}

function viewPatient(req, res) {
    return console.log('Ver')
}

function deletePatient(req, res) {
    return console.log('Delete')
}

module.exports = {
    savePatient,
    updatePatient,
    viewPatient,
    deletePatient
}