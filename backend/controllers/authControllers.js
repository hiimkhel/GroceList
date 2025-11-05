/**
 * @file authController.js
 * @description Handles user authentication
 * @module controllers/authController
 */

const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// [ AUTHENTENTICATION CONTROLLERS ]
//
// [1] REGISTER USER
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const userRegister = async (req, res) => {

    // Store
    const {name, email, password, address} = req.body;

    // Validation
    if( !name || !email || !password || !address){
        const error = new Error("All fields are mandatory!");
        error.statusCode = 400;
        throw error;
    }

    // Check for existing users
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        const error = new Error("User is already registered!");
        error.statusCode = 400;
        throw error
    }


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

        // Give user a JWT token
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{
            expiresIn: "7d" // Access Token
        })
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                address: newUser.address,

            }
        });
    }
    catch(err){
        next(err);
    }
}

// [1] USER LOGIN
// @desc Allows user to login
// @route POST /api/auth/login
// @access Public
const userLogin = async (req, res) => {
    const {email, password} = req.body;

    // Validate req body fields
    if(!email || !password) {
        const error = new Error("All fields are mandatory!");
        error.statusCode = 400;
        throw error;
    }

    try{
        const user = await User.findOne({ email });
        
        // If user does not exist
        if (!user){
            const error = new Error("User does not exist");
            error.statusCode = 400;
            throw error;
        }

        // Validate password using bcrypt
        const isValidPass = await bcrypt.compare(password, user.password);

        // If not valid
        if(!isValidPass){
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT Token
        const token = jwt.sign({id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
         res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
            },
            });
    }catch(err){
        next(err);
    }
}

module.exports = {userRegister, userLogin};