const express = require("express");

const { getCart, addToCart, updateProductQuantity, removeFromCart } = require("../controllers/cartControllers");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId/", verifyToken, getCart);
router.post("/:userId/add", verifyToken, addToCart);
router.patch("/:userId/update/:productId",verifyToken, updateProductQuantity);
router.delete("/:userId/remove/:productId", verifyToken, removeFromCart);
module.exports = router;