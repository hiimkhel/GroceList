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

// [2] DELETE USER
// @desc Deletes a user
// @route DELETE /api/:userId
// @access Public
const deleteUser  = async (req, res) => {
    const {userId} = req.params;
    try{
        
        const user = await User.findById(userId);
        // If user does not exist
        if(!user) return res.status(400).json({message: "User does not exist"});

         // TODO: Implement JWT authentication then uncomment
        // if (req.user.id !== userId) {
        // return res.status(403).json({ success: false, message: "Unauthorized action" });
        // }

        // Logic
        await User.findByIdAndDelete(userId);
        res.status(200).json({
        message: "User deleted successfully",
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// [3] UPDATE USER'S ADDRESS
// @desc Updates user's address
// @route PATCH /api/:userId
// @access Public
const updateAddress = async (req, res) => {
    const {userId} = req.params;
    const {address} = req.body;

    try{
        // Validate request body
        if (!address) {
        return res.status(400).json({ message: "Address is required" });
        }
        const user = await User.findById(userId);
        // If user does not exist
        if(!user) return res.status(400).json({message: "User does not exist"});

         // TODO: Implement JWT authentication then uncomment
        // if (req.user.id !== userId) {
        // return res.status(403).json({ success: false, message: "Unauthorized action" });
        // }

        // Logic
         const updatedUser = await User.findByIdAndUpdate(
            userId,
            { address },
            { new: true } // return updated document
            );
        res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports = {getUser, deleteUser, updateAddress};