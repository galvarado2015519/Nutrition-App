
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patientSchema = schema({
    perfil:{
        name: String,
        username: String,
        password: string
    },
    menu:{
        type: schema.Types.ObjectId, ref:'menu',
        breakfast: String,
        lunch: String,
        price: String,
        refaction: String
    },
    ailment:[{
        description: String
    }]
})

module.exports = mongoose.model('patient', patientSchema);