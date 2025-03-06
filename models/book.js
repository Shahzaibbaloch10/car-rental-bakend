
const mongoose = require('mongoose');


const bookingschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, ref: "users", required: true


    },
    ownerid: {
        type: mongoose.Schema.Types.ObjectId, ref: "cars", required: true
    },
    carid: {
        type: mongoose.Schema.Types.ObjectId, ref: "cars", required: true
    },



    pickupdate: {
        type: String,
        required: true
    },
    dropdate: {
        type: String,
        required: true
    },
    pickuptime: {
        type: String,
        required: true
    },
    droptime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }





}, { timestamps: true })
const bookingmodel = mongoose.model('booking', bookingschema)


module.exports = bookingmodel;