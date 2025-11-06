const express = require("express");
const {getAllProducts, getProductByCategory} = require("../controllers/marketplaceControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/", getAllProducts, getProductByCategory);

module.exports = router;