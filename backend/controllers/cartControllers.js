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
const getCart = async (req, res) => {
    const {userId} = req.params;

    try{
        const user = await User.findById(userId).populate("cart.productId"); 

         if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "Cart fetched successfully",
            cart: user.cart,
            });
        }catch(err){
            res.status(500).json({ message: err.message});
        }
}

// [2] ADD TO CART
// @desc Adds a product to user's cart
// @route POST /api/cart/:userId/add
// @access PRIVATE
const addToCart = async (req, res) => {
    const { userId } = req.params;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

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

    await user.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// [3] UPDATE PRODUCT QUANTITY
// @desc Updates quantity of product in user's cart
// @route PUT /api/cart/:userId/update/:productID
// @access PRIVATE
const updateProductQuantity = async (req, res) => {
    const {quantity} = req.body;
    const {userId, productId} = req.params;

    try{
      // Validate req parameters
      if(!userId || !productId || quantity === undefined) return res.status(400).json({message: "All fields are required"});

      // Validate that stock is a positive number
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity value" });
      }
      const user = await User.findById(userId);
      
      // If user does not exist
      if (!user) return res.status(400).json({message: "User does not exist"});

      const product = await Product.findById(productId);

      // If product does not exist
      if (!product) return res.status(400).json({message: "Product does not exist"});

      // Copy current user's cart
      const updatedCart = [...user.cart];
      
      // Iterate through the User model cart field 
      const productIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

      // Update quantity (make sure it's positive)
      updatedCart[productIndex].quantity = Math.max(1, Number(quantity));
      
      // Update user cart and save
      user.cart = updatedCart;
      await user.save();


      res.status(200).json({message: "Cart updated successfully", 
      cart: user.cart
      })
     
    }catch(err){
      res.status(500).json({message: err.message});
    }
}

module.exports = {addToCart, getCart, updateProductQuantity};