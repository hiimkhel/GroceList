/**
 * @file authMiddleware.js
 * @description Middleware for verifying JWT authentication
 */

const verifyToken = async (req, res, next) => {
  
    const authHeader = req.headers.authorization;

    // Error handling
    if(!authHeader || !authHeader.startWith("Bearer ")) return res.status(401).json({message: "Unauthorized"});

    // Remove the Bearer title from the header and store the value
    const token = authHeader.split("")[1];

    try{
        const decoded = jwt.verfiy(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    }catch(err){
        res.status(403).json({message: "Invalid or expired token"})
    }

};

module.exports = verifyToken;