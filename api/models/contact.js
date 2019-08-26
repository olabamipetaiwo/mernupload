const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    type: {
        type:String,
        default:"Personal"
    },
    phone: {
        type:String,
        default:"XXX-XXX-XXX"
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('contact', contactSchema);

