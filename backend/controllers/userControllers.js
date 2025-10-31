/**
 * @file userControllers.js
 * @description Handles profile management logic
 * @module controllers/userControllers
 */

const User = require("../models/userModel");
// [ USER CONTROLLERS ]
//
// [1] GET CURRENT USER
// @desc Fetch current user
// @route GET /api/user/:userId
// @access Public
const getUser = async (req, res) => {
    const {userId} = req.params;
    try{
        const user = await User.findById(userId);

        // If user does not exist
        if(!user) return res.status(400).json({message: "User does not exist"});

        res.status(200).json(user);
    
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = getUser;