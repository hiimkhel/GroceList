/**
 * @file marketplaceControllers.js
 * @description Handles CRUd methods to marketplace
 * @module controllers/marketplaceControllers
 */

const Product = require("../models/productModel");

// [ MARKETPLACE CONTROLLERS ]
//
// [1] GET ALL PRODUCTS
// @desc Displays all the products
// @route GET /api/marketplace/
// @access Public
const getAllProducts = async(req, res, next) => {
    try{
        const products = await Product.find({});
        if (!products || products.length === 0) {
            const error = new Error("No products found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({products})
    }catch(err){
        next(err);
    }
}

module.exports = getAllProducts;