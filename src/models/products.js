const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
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
        type: Object,
        required: true
    },
})

const Product = new mongoose.model("Product", productSchema)
module.exports = Product;