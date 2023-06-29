const mongoose = require("mongoose");


const cartProductSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    company:{
        type: String,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    about_item: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    count:{
        type:Number,
        minValue : 1
    }
})

const cartProduct = new mongoose.model("cartProduct", cartProductSchema);
module.exports = cartProduct;