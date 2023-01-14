const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    company:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    address_line1:{
        type: String,
        required: true,
    },
    address_line2:{
        type: String
    },
    postal_code:{
        type: Number,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    details_of_service:{
        type: String,
        required: true,
        trim: true
    }
})

const Vendor = new mongoose.model("Vendor", vendorSchema)
module.exports = Vendor;