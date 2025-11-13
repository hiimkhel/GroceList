/**
 * @file groceryListModel.js
 * @description Defines the Grocery List schema for the database
 * @module models/groceryListModel.js
 */
const mongoose = require("mongoose");

const groceryListSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    items:[
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: String,
            quantity: {type: Number, default: 1},
            isChecked: {type: Boolean, default: false},
        },
    ],
    isActive:{
        type: Boolean,
        default: false
    },
   
    
},  {timestamps: true});

module.exports = mongoose.model("GroceryList", groceryListSchema);