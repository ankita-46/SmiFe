const mongoose = require("mongoose");

const LastSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
     },
    ip: {
        type: String,
        required: true,
        unique: true
    }
});

const LastUser = new mongoose.model("lastUser", LastSchema);
module.exports = LastUser;