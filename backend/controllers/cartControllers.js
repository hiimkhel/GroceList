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
    const {userId} = req.params;
    const {name, price, image, stock, description } = req.body;

    if(!name || !price || !image || !stock || !description){
        return res.status(400).json({message: "All fields are mandatory!"});
    }

    try{
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

    }catch(err){
        
    }
}