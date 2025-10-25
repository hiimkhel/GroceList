const express = require("express");
const userRegister = require("../controllers/cartRoutes");

const router = express.Router();

router.get("/", userRegister);
router.post("/", )

module.exports = router;