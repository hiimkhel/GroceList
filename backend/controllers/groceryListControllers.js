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

// [3] UPDATE A GROCERY LIST
// @desc Updates a grocery list to database
// @route PATCH /api/list/:userId/:listId/update
// @access Private
const updateGroceryList = async (req, res, next) => {
    const {userId, listId} = req.params;
    const {title, items, isChecked} = req.body;

    try{

        if (req.user.id !== userId) {
            const error = new Error("Unauthorized action!");
            error.statusCode = 401;
            throw error;
        }

        const list = await GroceryList.findOne({_id: listId, userId});

        if(!list){
            const error = new Error("Grocery list is not found");
            error.statusCode = 404;
            throw error;
        }

        // Update title
        if(title) list.title =  title

        // Update items
        if (Array.isArray(items)){
            list.items = items.map((item) => ({
                name: item.name,
                quantity: item.quantity || 1,
                isChecked: item.isChecked || false
            }));
        }

        list.updatedAt = Date.now();

        await list.save();
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}

// [3] DELETE A GROCERY LIST
// @desc Deletes a grocery list
// @route DELETE /api/list/:userId/:listId/delete
// @access Private
const deleteGroceryList = async (req, res, next) => {
    const {userId, listId} =  req.params;

    try{

        if (req.user.id !== userId) {
            const error = new Error("Unauthorized action!");
            error.statusCode = 401;
            throw error;
        }
        if(!userId || !listId){
            const error = new Error("All fields are required!");
            error.statusCode = 400;
            throw error;
        }

        const list = GroceryList.findOne({_id: listId, userId});

        if(!list){
            const error = new Error("Grocery list not found!");
            error.statusCode = 404;
            throw error;
        }

        await GroceryList.findByIdAndDelete(listId);
        res.status(200).json({message: "Grocery list deleted successfully!"});


    }catch(err){
        next(err);
    }
}
module.exports = {getGroceryLists, addGroceryList, updateGroceryList, deleteGroceryList};