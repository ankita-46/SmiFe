const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required:true
    },
    age: {
        type:Number,  
        required:true,
    },
     email: {
        type:String,
        required:true,
        unique:true
     },
     gender:{
        type:String,
        required:true
     },
     phone: {
        type: Number,
        required: true,
        unique:true
     },
    
     password: {
        type:String,
        required:true
     },
     confirm_password: {
        type:String,
        required:true
     }
})

const User = new mongoose.model("User", userSchema)
module.exports = User;