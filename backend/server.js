/**
 * @file server.js
 * @description Entry point for the GroceList backend server. 
 * Handles environment setup, database connection, middleware configuration, 
 * and API route registration.
 * @version 1.0.0
 * @module backend
 */

const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/dbConnection");

const app = express();
dotenv.config();
connectDb();

const port = 5000;

app.use(express.json());

// [ROUTES SYSTEM]
// [1] Authentication
app.use("/api/auth", require("./routes/authRoutes.js"));
// [2] Grocery Cart
app.use("/api/cart", require("./routes/cartRoutes.js"));


app.listen(port || process.env.PORT, () => {
    console.log(`Port is running on port ${port || process.env.PORT}`)
})