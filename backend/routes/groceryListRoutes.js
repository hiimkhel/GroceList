const express = require("express");

const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();
const {getGroceryLists, addGroceryList, updateGroceryList, deleteGroceryList} = require("../controllers/groceryListControllers");

// [ROUTE ENDPOINTS]
router.get("/:userId", verifyToken, getGroceryLists);
router.post("/:userId/add", verifyToken, addGroceryList);
router.patch("/:userId/:listId/update", verifyToken, updateGroceryList);
router.delete("/:userId/:listId/delete", verifyToken, deleteGroceryList);
module.exports = router;