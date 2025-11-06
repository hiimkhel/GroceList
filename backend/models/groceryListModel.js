/**
 * @file groceryListModel.js
 * @description Defines the Grocery List schema for the database
 * @module models/groceryListModel.js
 */

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
            name: String,
            quantity: {type: Number, default: 1},
            isChecked: {type: Boolean, default: false},
        },
    ],
    isActive:{
        type: Boolean,
        default: false
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model("Grocery-List", groceryListSchema);