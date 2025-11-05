/**
 * @ NOT A MAIN FILE
 * @file seedProduct.js
 * @description Handles adding of predefined products array to database
 * @module seed/seedProducts
 */


const mongoose = require("mongoose");
const Product = require("../models/productModel");
require('dotenv').config({ path: '../.env' });

console.log("Loaded DATABASE_URI:", process.env.DATABASE_URI);

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connected");

    // Clear old data
    await Product.deleteMany({});
    console.log("[CLEAR OLD DATASET ]");

    // Product seed data
    const products = [
        // [PANTRY]
      {
        name: "Harvesters Rice Thai Jasmine | 2kg",
        price: 248,
        image: "",
        stock: 50,
        description: "Harvester's Thai Jasmine Rice is a great balance between superior great tasting aromatic Thai jasmine rice and a good price. Has a soft texture, aroma reminiscent of pandan, and the good eating quality. Healthy and satisfying meal without compromising the taste and quality of your rice. Its soft delicious texture makes it perfect for your favorite meals.",
        tag: "pantry"
      },
      {
        name: "Lady’s Choice Mayonnaise 220ml",
        price: 65,
        image: "",
        stock: 50,
        description: "Rich, creamy mayo for sandwiches and salads.",
        tag: "pantry"
      },
      {
        name: "UFC Banana Ketchup 320g",
        price: 32,
        image: "",
        stock: 50,
        description: "Sweet-spicy banana ketchup perfect for Filipino dishes.",
        tag: "pantry"
      },
      {
        name: "Golden Fiesta Canola Oil 1L",
        price: 175,
        image: "",
        stock: 50,
        description: "Heart-healthy cooking oil made from pure canola.",
        tag: "pantry"
      },
      {
        name: "Datu Puti Soy Sauce 1L",
        price: 47,
        image: "",
        stock: 50,
        description: "Classic Filipino soy sauce for marinades and dips.",
        tag: "pantry"
      },
      {
        name: "Silver Swan Soy Sauce 1L",
        price: 45,
        image: "",
        stock: 50,
        description: "Everyday soy sauce with balanced saltiness.",
        tag: "pantry"
      },
      {
        name: "Datu Puti Vinegar 1L",
        price: 35,
        image: "",
        stock: 50,
        description: "Traditional cane vinegar for cooking and pickling.",
        tag: "pantry"
      },
      {
        name: "Silver Swan Soy Sauce 1L",
        price: 33,
        image: "",
        stock: 50,
        description: "All-purpose vinegar with mild acidity.",
        tag: "pantry"
      },
      {
        name: "Maggi Magic Sarap 8g (pack of 12)",
        price: 90,
        image: "",
        stock: 50,
        description: "All-in-one seasoning granules for enhanced flavor.",
        tag: "pantry"
      },
      {
        name: "Knorr Chicken Cubes 60g",
        price: 45,
        image: "",
        stock: 50,
        description: "Chicken-flavored broth cubes for soups and sauces.",
        tag: "pantry"
      },
      
      // [INSTANT FOOD]
      {
        name: "Lucky Me! Pancit Canton (Original)",
        price: 17,
        image: "",
        stock: 50,
        description: "Classic stir-fry noodles with savory seasoning.",
        tag: "instant-food"
      },
      {
        name: "Lucky Me! Pancit Canton (Calamansi)",
        price: 17,
        image: "",
        stock: 50,
        description: "Tangy calamansi-flavored stir-fry noodles.",
        tag: "instant-food"
      },
      {
        name: "Lucky Me! Pancit Canton (Chilimansi)",
        price: 17,
        image: "",
        stock: 50,
        description: "Spicy and tangy version of classic pancit canton.",
        tag: "instant-food"
      },
      {
        name: "Nissin Ramen (Seafood Flavor)",
        price: 35,
        image: "",
        stock: 50,
        description: "Instant ramen with rich seafood broth.",
        tag: "instant-food"
      },
      {
        name: "Nissin Cup Noodles (Beef Flavor)",
        price: 35,
        image: "",
        stock: 50,
        description: "Quick beef-flavored instant cup noodles.",
        tag: "instant-food"
      },
      {
        name: "Payless Xtra Big Pancit Canton (Sweet & Spicy)",
        price: 21,
        image: "",
        stock: 50,
        description: "Larger serving with sweet and spicy flavor.",
        tag: "instant-food"
      },
      {
        name: "Lucky Me! Instant Mami (Beef)",
        price: 17,
        image: "",
        stock: 50,
        description: "Savory beef-flavored noodle soup.",
        tag: "instant-food"
      },
      {
        name: "Century Tuna Caldereta 155g",
        price: 14,
        image: "",
        stock: 50,
        description: "Tuna flakes in rich caldereta-style sauce.",
        tag: "instant-food"
      },
      {
        name: "Argentina Corned Beef 150g",
        price: 44,
        image: "",
        stock: 50,
        description: "Classic Filipino-style corned beef.",
        tag: "instant-food"
      },
      {
        name: "Delimondo Corned Beef 260g",
        price: 99,
        image: "",
        stock: 50,
        description: "Premium corned beef with rich beef flavor.",
        tag: "instant-food"
      },
      // [HEALTH & HYGIENE]
      {
        name: "Head & Shoulders Anti-Dandruff Shampoo 170ml",
        price: 145,
        image: "",
        stock: 50,
        description: "Refreshing shampoo that removes dandruff and soothes scalp.",
        tag: "health-and-hygiene"
      },
      {
        name: "Palmolive Naturals Conditioner 180ml",
        price: 130,
        image: "",
        stock: 50,
        description: "Smooth, nourishing conditioner with natural extracts.",
        tag: "health-and-hygiene"
      },
      {
        name: "Colgate Triple Action Toothpaste 100g",
        price: 75,
        image: "",
        stock: 50,
        description: "Toothpaste for cavity protection, whitening, and fresh breath.",
        tag: "health-and-hygiene"
      },
      {
        name: "Oral-B Toothbrush (2-pack)",
        price: 120,
        image: "",
        stock: 50,
        description: "Durable soft-bristle toothbrush for daily oral care.",
        tag: "health-and-hygiene"
      },
      {
        name: "Safeguard Pure White Bar Soap 90g",
        price: 34,
        image: "",
        stock: 50,
        description: "Antibacterial soap for all-around skin protection.",
        tag: "health-and-hygiene"
      },
      // [FRUITS & VEGETABLES]
      {
        name: "Bananas (Lakatan) 1kg",
        price: 80,
        image: "",
        stock: 50,
        description: "Sweet local banana variety rich in potassium.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Mango (Carabao) 1kg",
        price: 140,
        image: "",
        stock: 50,
        description: "Sweet, juicy tropical mango variety.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Apples (Washington) 1kg",
        price: 180,
        image: "",
        stock: 50,
        description: "Imported crisp red apples, mildly sweet.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Oranges (Valencia) 1kg",
        price: 160,
        image: "",
        stock: 50,
        description: "Sweet and tangy imported oranges.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Pineapple (whole)",
        price: 70,
        image: "",
        stock: 50,
        description: "Fresh whole pineapple, rich in vitamin C.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Tomatoes 1kg",
        price: 70,
        image: "",
        stock: 50,
        description: "Fresh red tomatoes ideal for cooking and salads.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Onions (Red) 1kg",
        price: 100,
        image: "",
        stock: 50,
        description: "Locally grown red onions for flavoring dishes.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Garlic 250g",
        price: 45,
        image: "",
        stock: 50,
        description: "Aromatic garlic for everyday cooking.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Potatoes 1kg",
        price: 90,
        image: "",
        stock: 50,
        description: "Starchy vegetable used in soups and fries.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "String Beans (Sitaw) 1 bundle",
        price: 25,
        image: "",
        stock: 50,
        description: "Long green beans for stir-fries and stews.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Cabbage 1 head",
        price: 65,
        image: "",
        stock: 50,
        description: "Leafy vegetable for soups, salads, and stir-fries.",
        tag: "fruits-and-vegetabels"
      },
      {
        name: "Ampalaya 1 piece",
        price: 25,
        image: "",
        stock: 50,
        description: "Bitter melon rich in nutrients and antioxidants.",
        tag: "fruits-and-vegetabels"
      },
      // [FRESH MEAT & SEAFOODS]
      {
        name: "Chicken Drumstick 1kg",
        price: 190,
        image: "",
        stock: 50,
        description: "Fresh chicken legs ideal for frying or stews.",
        tag: "meat-and-seafood"
      },
      {
        name: "Chicken Breast Fillet 1kg",
        price: 260,
        image: "",
        stock: 50,
        description: "Boneless, skinless chicken meat for grilling or salads.",
        tag: "meat-and-seafood"
      },
      {
        name: "Pork Liempo 1kg",
        price: 330,
        image: "",
        stock: 50,
        description: "Pork belly cut, perfect for grilling or roasting.",
        tag: "meat-and-seafood"
      },
      {
        name: "Beef Tapa Slices 1kg",
        price: 480,
        image: "",
        stock: 50,
        description: "Marinated beef slices for traditional Filipino tapa.",
        tag: "meat-and-seafood"
      },
      {
        name: "Ground Beef 1kg",
        price: 420,
        image: "",
        stock: 50,
        description: "Freshly ground beef for patties and sauces.",
        tag: "meat-and-seafood"
      },
      {
        name: "Bangus (Milkfish) 1 piece",
        price: 180,
        image: "",
        stock: 50,
        description: "Whole milkfish, a popular Filipino staple fish.",
        tag: "meat-and-seafood"
      },
      {
        name: "Tilapia 1kg",
        price: 160,
        image: "",
        stock: 50,
        description: "Freshwater fish, mild taste, great for frying.",
        tag: "meat-and-seafood"
      },
      {
        name: "Galunggong (Round Scad) 1kg",
        price: 170,
        image: "",
        stock: 50,
        description: "Common local fish, flavorful when fried.",
        tag: "meat-and-seafood"
      },
      {
        name: "Shrimp (Medium) 1kg",
        price: 450,
        image: "",
        stock: 50,
        description: "Medium-sized shrimp, good for sinigang or tempura.",
        tag: "meat-and-seafood"
      },
      {
        name: "Squid (Calamari Rings) 500g",
        price: 220,
        image: "",
        stock: 50,
        description: "Cleaned squid rings for frying or grilling.",
        tag: "meat-and-seafood"
      },
      // [FROZEN FOOD]
      {
        name: "Purefoods Tender Juicy Hotdog 1kg",
        price: 250,
        image: "",
        stock: 50,
        description: "Popular red hotdog, tender and juicy classic favorite.",
        tag: "frozen-foods"
      },
      {
        name: "CDO Idol Cheesedog 1kg",
        price: 240,
        image: "",
        stock: 50,
        description: "Hotdogs filled with creamy cheese bits.",
        tag: "frozen-foods"
      },
      {
        name: "Pampanga’s Best Tocino 500g",
        price: 180,
        image: "",
        stock: 50,
        description: "Sweet-cured pork tocino ready for frying.",
        tag: "frozen-foods"
      },
      {
        name: "Mekeni Skinless Longganisa 500g",
        price: 170,
        image: "",
        stock: 50,
        description: "Filipino-style garlicky sweet longganisa.",
        tag: "frozen-foods"
      },
      {
        name: "Bounty Fresh Chicken Nuggets 250g",
        price: 110,
        image: "",
        stock: 50,
        description: "Breaded bite-size chicken pieces for frying.",
        tag: "frozen-foods"
      },
      {
        name: "Fries King French Fries 1kg",
        price: 120,
        image: "",
        stock: 50,
        description: "Frozen potato fries for air-fry or deep-fry use.",
        tag: "frozen-foods"
      },
      {
        name: "Golden Phoenix Frozen Siomai 500g",
        price: 160,
        image: "",
        stock: 50,
        description: "Ready-to-cook pork siomai for steaming or frying.",
        tag: "frozen-foods"
      },
      {
        name: "San Miguel Purefoods Ham 500g",
        price: 250,
        image: "",
        stock: 50,
        description: "Ready-to-eat sweet ham slices for sandwiches or meals.",
        tag: "frozen-foods"
      },
      {
        name: "Virginia Hotdog Jumbo 1kg",
        price: 235,
        image: "",
        stock: 50,
        description: "Jumbo-sized hotdogs with firm texture and rich flavor.",
        tag: "frozen-foods"
      },
      {
        name: "Swift Premium Corned Beef Tapa 250g",
        price: 165,
        image: "",
        stock: 50,
        description: "Premium corned beef tapa, ready to fry.",
        tag: "frozen-foods"
      },


    ];

    // Insert new seed data
    await Product.insertMany(products);
    console.log("[SEEDING SUCCEDED]");

    // Close the database connection
    await mongoose.connection.close();
    console.log("[DATABASE CLOSED]");
  } catch (error) {
    console.error("Error seeding products:", error.message);
    mongoose.connection.close();
  }
};

seedProducts();