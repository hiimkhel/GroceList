/**
 * @file authController.js
 * @description Handles user authentication and profile management logic.
 * @module controllers/authController
 */

const User = require("../models/userModel");
const bcrypt = require("bcrypt")

// [ AUTHENTENTICATION CONTROLLERS ]
// [1] REGISTER USER
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const userRegister = async (req, res) => {

    // Store
    const {name, email, password, address} = req.body;

    // Validation
    if( !name || !email || !password || !address) return res.status(400).json({message: "All fields are mandatory!"});

    // Check for existing users
    const userAvailable = await User.findOne({email});

    if(userAvailable) return res.status(400).json({message: "User is already registered!"});


    try{
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            cart: []
        });
        res.status(201).json(newUser);
    }
    catch(err){
        req.status(400).json({message: err.message});
    }
}


module.exports = userRegister;