const express = require("express");

const { getCart, addToCart } = require("../controllers/cartControllers");

const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId/", getCart);
router.post("/:userId/add", addToCart);

module.exports = router;