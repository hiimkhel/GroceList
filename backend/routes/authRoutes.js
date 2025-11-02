const express = require("express");
const {userLogin, userRegister} = require("../controllers/authControllers");

const router = express.Router();

// [ROUTE ENDPOINTS]
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;