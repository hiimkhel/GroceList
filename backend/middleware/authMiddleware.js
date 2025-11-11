/**
 * @file authMiddleware.js
 * @description Middleware for verifying JWT authentication
 */
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
    if(process.env.NODE_ENV === "development"){
        // Temporary user for development
        req.user ={id: req.params.userId};
        return next();
    }
    const authHeader = req.headers.authorization;


    // Error handling
    if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({message: "Unauthorized"});

    // Remove the Bearer title from the header and store the value
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id}; 
        next();
    }catch(err){
        res.status(403).json({message: "Invalid or expired token"})
    }

};

module.exports = verifyToken;