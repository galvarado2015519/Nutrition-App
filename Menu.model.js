
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const menuSchema = schema({
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