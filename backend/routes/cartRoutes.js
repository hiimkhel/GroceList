const express = require("express");

const { getCart, addToCart, updateProductQuantity } = require("../controllers/cartControllers");

const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId/", getCart);
router.post("/:userId/add", addToCart);
router.patch("/:userId/update/:productId", updateProductQuantity)
module.exports = router;