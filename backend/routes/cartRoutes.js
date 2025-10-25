const express = require("express");

const { getCart, addToCart } = require("../controllers/cartControllers");

const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/", getCart);
router.post("/", addToCart);

module.exports = router;