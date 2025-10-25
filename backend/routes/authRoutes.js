const express = require("express");
const userRegister = require("../controllers/authControllers");

const router = express.Router();

// [ROUTE ENDPOINTS]
router.post("/register", userRegister);

module.exports = router;