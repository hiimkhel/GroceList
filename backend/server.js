const express = require('express');

const app = express();

const router = express.Router();

const PORT = 5000;

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Port is running on port ${PORT}`)
})