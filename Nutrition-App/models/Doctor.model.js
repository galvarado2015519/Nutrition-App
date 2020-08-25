
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = Schema({
    perfile:{
        name: String,
        matricula: String,
        email: String,
        password: String,
        telephone: Number
    },
    patient:[{type: Schema.Types.ObjectId, ref: 'patient'}],
})

module.exports = mongoose.model('doctor', doctorSchema);