const express = require("express");
const {getAllProducts, getProduct} = require("../controllers/marketplaceControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/", getAllProducts);
router.get("/:productId", getProduct);
module.exports = router;