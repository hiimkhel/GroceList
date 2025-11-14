const express = require("express");

const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();
const {getGroceryLists, addGroceryList, updateGroceryList, deleteGroceryList, deleteItemFromList, addItemToList, getGroceryList, editItem} = require("../controllers/groceryListControllers");

// [ROUTE ENDPOINTS]
router.get("/:userId", verifyToken, getGroceryLists);
router.get("/:userId/:listId", verifyToken, getGroceryList);
router.post("/:userId/add", verifyToken, addGroceryList);
router.post("/:userId/:listId/add-item", verifyToken, addItemToList);
router.patch("/:userId/:listId/update", verifyToken, updateGroceryList);
router.put("/:userId/:listId/edit-item/:itemId", verifyToken, editItem);
router.delete("/:userId/:listId/delete", verifyToken, deleteGroceryList);
router.delete("/:userId/:listId/delete-item/:itemId", verifyToken, deleteItemFromList);
module.exports = router;