const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const salt =  bcrypt.genSalt(10);

const userSchema = Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hash(password,salt);
};

userSchema.methods.validatePassword = (password,encryptedPassword) => {
    return bcrypt.compare(password,encryptedPassword);
};




module.exports = mongoose.model('user', userSchema);

