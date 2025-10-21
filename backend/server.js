const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/dbConnection");

const app = express();
dotenv.config();
connectDb();
const router = express.Router();

const PORT = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));

app.listen(PORT, () => {
    console.log(`Port is running on port ${PORT}`)
})