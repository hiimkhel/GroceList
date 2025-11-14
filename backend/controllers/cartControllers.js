/**
 * @file cartControllers.js
 * @description Handles all logic related to managing the user's grocery cart.
 * Provides endpoints for viewing, adding, updating, and removing cart items.
 * @module controllers/cartControllers
 */

const User = require("../models/userModel");
const Product = require("../models/productModel");

// [ CART CONTROLLERS ]
//
// [1] GET USER CART
// @desc Fetches user cart
// @route GET /api/cart/:userId/
// @access PRIVATE
const getCart = async (req, res, next) => {
    const {userId} = req.params;

    try{
        const user = await User.findById(userId).populate("cart.productId"); 
        
        if (req.user.id !== userId) {
          const error = new Error("Unauthorized action!");
          error.statusCode = 401;
          throw error;
        }
        if (!user){
          const error = new Error("User not found");
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({
            message: "Cart fetched successfully",
            cart: user.cart,
            });
        }catch(err){
            next(err);
        }
}

// [2] ADD TO CART
// @desc Adds a product to user's cart
// @route POST /api/cart/:userId/add
// @access PRIVATE
const addToCart = async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    const error = new Error("Product ID field is required");
    error.statusCode = 400;
    throw error;
  }

  try {
    const user = await User.findById(userId);

    if (req.user.id !== userId) {
      const error = new Error("Unauthorized action!");
      error.statusCode = 401;
      throw error;
    }
      
    if (!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.findById(productId);
    if (!product){
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Not enough stock available" });
    }

    // Check if the product is already in the cart
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ productId, quantity });
    }
    product.stock -= quantity; // Update that product stock

    await product.save();
    await user.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (err) {
    next(err);
  }
}

// [3] UPDATE PRODUCT QUANTITY
// @desc Updates quantity of product in user's cart
// @route PUT /api/cart/:userId/update/:productID
// @access PRIVATE
const updateProductQuantity = async (req, res, next) => {
    const {quantity} = req.body;
    const {userId, productId} = req.params;

    try{
      // Validate req parameters
      if(!userId || !productId || quantity === undefined){
        const error = new Error("All field are mandatory");
        error.statusCode = 400;
        throw error;
      }

      // Validate that stock is a positive number
      if (typeof quantity !== "number" || quantity < 0) {
        const error = new Error("Quantity field value invalid");
        error.statusCode = 400;
        throw error;
      }
      const user = await User.findById(userId);

       if (req.user.id !== userId) {
        const error = new Error("Unauthorized action!");
        error.statusCode = 401;
        throw error;
      }
      
      // If user does not exist
      if (!user){
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }

      const product = await Product.findById(productId);

      // If product does not exist
      if (!product){
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      // Copy current user's cart
      const updatedCart = [...user.cart];
      
      // Iterate through the User model cart field 
      const productIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1){
        const error = new Error("Product not found in cart");
        error.statusCode = 404;
        throw error;
      }

      // Update quantity (make sure it's positive)
      updatedCart[productIndex].quantity = Math.max(1, Number(quantity));
      
      // Update user cart and save
      user.cart = updatedCart;
      await user.save();


      res.status(200).json({message: "Cart updated successfully", 
      cart: user.cart
      })
     
    }catch(err){
      next(err);
    }
}

// [4] DELETE PRODUCT
// @desc Deletes a product from user's cart
// @route PUT /api/cart/:userId/delete/:productId
// @access PRIVATE
const removeFromCart = async (req, res, next) => {
  const {userId, productId} = req.params;
  try{
    if(!userId || !productId){
      const error = new Error("All fields are mandatory!");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(userId);

    if (req.user.id !== userId) {
      const error = new Error("Unauthorized action!");
      error.statusCode = 401;
      throw error;
    }
    // If user does not exist
      if (!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const product = await Product.findById(productId);

      // If product does not exist
      if (!product){
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      
      const productIndex = await user.cart.findIndex((p)=> p.productId.toString() === productId);
      // If product not found in the cart
      if (productIndex === -1) {
        const error = new Error("Product not found in cart");
        error.statusCode = 404;
        throw error;
      }

      // Get product to remove quantity
      const quantityToRestore = user.cart[productIndex].quantity;

      product.stock += quantityToRestore;
      await product.save();

      
      user.cart.splice(productIndex, 1);
      await user.save();
      
      res.status(200).json({message: "Product removed successfully"});

  }catch(err){
    next(err);
  }
}
module.exports = {addToCart, getCart, updateProductQuantity, removeFromCart};