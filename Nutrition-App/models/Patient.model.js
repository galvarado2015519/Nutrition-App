
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patientSchema = schema({
    perfile:{
        name: String,
        username: String,
        email: String,
        password: String,
        telephone: String
    },
    menu:{
        idMenu:[{type: schema.Types.ObjectId, ref:'menu'}],
        breakfast: [],
        lunch: [],
        price: [],
        refaction: []
    },
    ailment:[{
        description: String
    }]
})

module.exports = mongoose.model('patient', patientSchema);