const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/dbConnection");

const app = express();
dotenv.config();
const router = express.Router();

const PORT = 5000;

app.use(express.json());

connectDb();
app.listen(PORT, () => {
    console.log(`Port is running on port ${PORT}`)
})