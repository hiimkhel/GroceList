/**
 * @file productModel.js
 * @description Defines the Product schema for the database, representing grocery items.
 * @module models/productModel
 */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String},
    stock: {type: Number, default: 0},
    description: {type: String},
    tags: {
      type: [String],
      default: [],
      index: true,
    },
});

module.exports = mongoose.model("Product", productSchema);