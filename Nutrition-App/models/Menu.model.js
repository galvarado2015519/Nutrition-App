
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = Schema({
    idDoctor: [{type: Schema.Types.ObjectId, ref:'doctor'}],
    breakfast:{ 
        time: Date,
        food: []
    },
    lunch:{ 
        time: Date,
        food: []
    },
    price:{ 
        time: Date,
        food: []
    },
    refaction:{ 
        time: Date,
        food: []
    }
})

module.exports = mongoose.model('menu',menuSchema);