const express = require("express");

const { getCart, addToCart } = require("../controllers/cartControllers");

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);

module.exports = router;