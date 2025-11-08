/**
 * @file marketplaceControllers.js
 * @description Handles CRUd methods to marketplace
 * @module controllers/marketplaceControllers
 */

const Product = require("../models/productModel");
const PRODUCT_CATEGORIES = ["pantry", "instant-food", "health-and-hygiene", 
    "fruits-and-vegetables", "meat-and-seafood", 
    "frozen-foods", "dairy", 
    "bakery", "snacks", "beverage"];
// [ MARKETPLACE CONTROLLERS ]
//
// [1] GET ALL PRODUCTS
// @desc Displays all the products also allows query parameter
// @route GET /api/marketplace/ && /api/marketplace?category=category
// @access Public
const getAllProducts = async(req, res) => {
    const {category} = req.query;

    // Apply query parameter if the URL has one
    if(category){
        try{
            if(!PRODUCT_CATEGORIES.includes(category)){
            const error = new Error("Invalid category!");
            error.statusCode = 400;
            throw error;
            }
            // Store the category to fetch
            const products = await Product.find({tag: category});

            // Handle if products in that category is 0
            if(!products || products.length === 0){
                const error = new Error(`No products found for ${category} category`);
                error.statusCode = 400;
                throw error;
            }

            res.status(200).json(products);

        }catch(err){
            next(err);
        }
    }else{

    
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
    
}

// [2] GET PRODUCT
// @desc Fetches a product
// @route GET /api/marketplace/:productId
// @access Public

const getProduct = async(req, res) => {
    const {productId} = req.params;

    try{
        if(!productId){
            const error = new Error("Product ID is missing!");
            error.statusCode = 400;
            throw error;
        }

        const product = await Product.findById(productId);

        if(!product){
            const error = new Error("Product is not found!");
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({
            product
        })
    }catch(err){
        next(err);
    }
}


module.exports = {getAllProducts, getProduct};