const express = require("express");
const {getAllProducts} = require("../controllers/marketplaceControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/", getAllProducts);

module.exports = router;