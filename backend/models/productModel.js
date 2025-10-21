const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String},
    stock: {type: Number, default: 0},
    description: {type: String}
});

module.exports = mongoose.model("Product", productSchema);