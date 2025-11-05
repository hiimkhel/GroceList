/**
 * @file marketplaceControllers.js
 * @description Handles CRUd methods to marketplace
 * @module controllers/marketplaceControllers
 */

const User = require("../models/productModel");

// [ MARKETPLACE CONTROLLERS ]
//
// [1] GET ALL PRODUCTS
// @desc Displays all the products
// @route GET /api/marketplace/
// @access Public
const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({products})
    }catch(err){
        next(err);
    }
}

module.exports = getAllProducts;