const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/dbConnection");

const app = express();
dotenv.config();
connectDb();
const router = express.Router();

const PORT = 5000;

app.use(express.json());

// [ROUTES SYSTEM]
// [1] Authentication
app.use("/api/auth", require("./routes/authRoutes.js"));
// [2] Grocery Cart
app.use("/api/:userId/cart/", require("./routes/cartRoutes.js"));


app.listen(PORT, () => {
    console.log(`Port is running on port ${PORT}`)
})