const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        default: null,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        default: null
    },
    cart:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            addedAt:{
                type: Date,
                default: Date.now()
            },
        },
    ],
});


module.exports = mongoose.model("User", userSchema);