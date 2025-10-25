/**
 * @ NOT A MAIN FILE
 * @file seedProduct.js
 * @description Handles adding of predefined products array to database
 * @module seed/seedProducts
 */


const mongoose = require("mongoose");
const Product = require("../models/productModel");
require('dotenv').config({ path: '../.env' });

console.log("🔍 Loaded DATABASE_URI:", process.env.DATABASE_URI);

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Product.deleteMany({});
    console.log("🧹 Cleared old products collection");

    // Product seed data
    const products = [
      {
        name: "Fresh Bananas",
        price: 45,
        image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12f",
        stock: 50,
        description: "Ripe yellow bananas rich in potassium.",
        tags: ["fruit", "fresh produce", "healthy"],
      },
      {
        name: "Organic Eggs (Dozen)",
        price: 120,
        image: "https://images.unsplash.com/photo-1589927986089-35812386e8ef",
        stock: 30,
        description: "Farm fresh organic eggs in a dozen pack.",
        tags: ["dairy", "organic", "protein"],
      },
      {
        name: "Whole Milk 1L",
        price: 65,
        image: "https://images.unsplash.com/photo-1580910051071-22d3d76d1e9a",
        stock: 25,
        description: "Creamy whole milk, 100% fresh.",
        tags: ["dairy", "beverage", "essentials"],
      },
      {
        name: "Premium Jasmine Rice (5kg)",
        price: 250,
        image: "https://images.unsplash.com/photo-1608451643041-fb3aaefb056c",
        stock: 100,
        description: "High-quality fragrant jasmine rice from Thailand.",
        tags: ["grains", "rice", "staples"],
      },
      {
        name: "Fresh Tomatoes (1kg)",
        price: 70,
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        stock: 40,
        description: "Red juicy tomatoes perfect for cooking and salads.",
        tags: ["vegetable", "fresh produce", "healthy"],
      },
      {
        name: "White Bread Loaf",
        price: 55,
        image: "https://images.unsplash.com/photo-1577401239170-897942555fbf",
        stock: 20,
        description: "Soft white bread baked fresh daily.",
        tags: ["bakery", "breakfast", "essentials"],
      },
      {
        name: "Brown Sugar (1kg)",
        price: 90,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e17e",
        stock: 60,
        description: "Unrefined brown sugar with natural molasses flavor.",
        tags: ["baking", "sweeteners", "pantry"],
      },
      {
        name: "Canned Tuna (180g)",
        price: 75,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
        stock: 80,
        description: "Canned tuna in water, protein-packed and ready to eat.",
        tags: ["canned goods", "protein", "seafood"],
      },
      {
        name: "Cooking Oil (1L)",
        price: 130,
        image: "https://images.unsplash.com/photo-1615485296518-291d7ef8e1d5",
        stock: 45,
        description: "Refined pure vegetable oil for everyday cooking.",
        tags: ["pantry", "cooking essentials", "oil"],
      },
      {
        name: "Instant Noodles (5 Pack)",
        price: 65,
        image: "https://images.unsplash.com/photo-1604908177225-6f4cfcf2759e",
        stock: 70,
        description: "Quick and easy instant noodles with savory flavor.",
        tags: ["instant food", "snacks", "pantry"],
      },
    ];

    // Insert new seed data
    await Product.insertMany(products);
    console.log("🍎 Seeded 10 categorized products successfully!");

    // Close the database connection
    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    mongoose.connection.close();
  }
};

seedProducts();