/**
 * @file dbConnection.js
 * @description Handles database connection and configuration to MONGODB
 * @module config/dbConnection
 */

const mongoose = require('mongoose');


const connectDb = async (req, res) => {
    try{
        const connect = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`
            Database connected: ${connect.connection.name}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;
