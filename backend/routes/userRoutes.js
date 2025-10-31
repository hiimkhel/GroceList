const express = require("express");
const getUser = require("../controllers/userControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId", getUser);

module.exports = router;