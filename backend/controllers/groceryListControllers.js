/**
 * @file groceryListControllers.js
 * @description Manages user's grocery lists
 * @module controllers/groceryListControllers
 */

const User = require("../models/userModel");
const GroceryList = require("../models/groceryListModel");

// [ GROCERY LIST CONTROLLERS ]
//
// [1] GET ALL LISTS
// @desc Fetch all grocery lists of the user
// @route POST /api/list/:userId
// @access Private
const getGroceryLists = async (req, res, next) => {
    const {userId} = req.params;

    try{
        if(!userId){
            const error = new Error("User ID parameter is required!");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findById(userId);

        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 400;
            throw error;
        }

        const lists = await GroceryList.find({userId});

        res.status(200).json(lists);

    }catch(err){
        next(err);
    }
}
// [2] ADD A GROCERY LIST
// @desc Add a grocery list to database
// @route POST /api/list/:userId/add
// @access Private
const addGroceryList = async(req, res, next) => {
    const {userId} = req.params;
    const {title, items} = req.body;

    try{
        if(!Array.isArray(items)){
            const error = new Error("Items should be an array!");
            error.statusCode = 400;
            throw error;
        }

        const newList = await GroceryList.create({
            userId,
            title,
            items
        });

        res.status(200).json(newList);
    }catch(err){
        next(err);
    }
}
module.exports = {getGroceryLists, addGroceryList};