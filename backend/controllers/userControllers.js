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
// @access Private
const getUser = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const user = await User.findById(userId);

        // If user does not exist
        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json(user);
    
    }catch(err){
        next(err);
    }
}

// [2] DELETE USER
// @desc Deletes a user
// @route DELETE /api/:userId
// @access Public
const deleteUser  = async (req, res, next) => {
    const {userId} = req.params;
    try{
        
        const user = await User.findById(userId);
        // If user does not exist
        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 400;
            throw error;
        }

        if (req.user.id !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // Logic
        await User.findByIdAndDelete(userId);
        res.status(200).json({
        message: "User deleted successfully",
        });
    }catch(err){
        next(err);
    }
}

// [3] UPDATE USER'S ADDRESS
// @desc Updates user's address
// @route PATCH /api/:userId
// @access Public
const updateAddress = async (req, res, next) => {
    const {userId} = req.params;
    const {address, lat, long} = req.body;

    try{
        // Validate request body
        if (!address) {
            const error = new Error("Address field is required!");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findById(userId);
        // If user does not exist
        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 400;
            throw error;
        }
        if (req.user.id !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // Logic
         const updatedUser = await User.findByIdAndUpdate(
             userId,
            {
                address,
                location: {
                type: "Point",
                coordinates: [long, lat], // GeoJSON format
                },
            },
            { new: true }
            );
        res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
        });
    }catch(err){
        next(err);
    }
}
module.exports = {getUser, deleteUser, updateAddress};