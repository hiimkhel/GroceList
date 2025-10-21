const User = require("../models/userModel");
const bcrypt = require("bcrypt")

const userRegister = async (req, res) => {
    const {name, email, password, address} = req.body;

    if( !name || !email || !password || !address) return res.status(400).json({message: "All fields are mandatory!"});

    const userAvailable = await User.findOne({email});

    if(userAvailable) return res.status(400).json({message: "User is already registered!"});
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            cart: []
        });
        res.status(201).json(newUser);
    }
    catch(err){
        req.status(400).json({message: err.message});
    }
}

module.exports = userRegister;