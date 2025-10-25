/**
 * @file cartControllers.js
 * @description Handles all logic related to managing the user's grocery cart.
 * Provides endpoints for viewing, adding, updating, and removing cart items.
 * @module controllers/cartControllers
 */

const User = require("../models/userModel");
const Product = require("../models/productModel");

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

module.exports = {addToCart, getCart};