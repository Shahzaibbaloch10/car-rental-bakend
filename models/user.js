

const mongodb = require('mongoose');


const userschema = new mongodb.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    }


},{timestamps:true});
const usermodel = mongodb.model('users', userschema);
module.exports= usermodel