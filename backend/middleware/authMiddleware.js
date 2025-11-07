/**
 * @file authMiddleware.js
 * @description Middleware for verifying JWT authentication
 */
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  
    const authHeader = req.headers.authorization;

    console.log("Received Header:", authHeader); // ✅ Debug line

    // Error handling
    if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({message: "Unauthorized"});

    // Remove the Bearer title from the header and store the value
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // ✅ Debug line
    console.log("JWT_SECRET from .env:", process.env.JWT_SECRET); // ✅ Debug line

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded payload:", decoded);
        req.user = decoded; 
        next();
    }catch(err){
        console.error("JWT Verification Error:", err.message); // ✅ Debug line
        res.status(403).json({message: "Invalid or expired token"})
    }

};

module.exports = verifyToken;