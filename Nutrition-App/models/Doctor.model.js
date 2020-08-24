
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const doctorSchema = schema({
    perfile:{
        name: String,
        userName: String,
        matricula: String,
        email: String,
        password: String,
        telephone: Number
    },
    patient:[{type: Schema.Types.ObjectId, ref: 'patient'}],
})

module.exports = mongoose.model('doctor', doctorSchema);