const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User'); 
const singup = async(req, res) => {
    try {
        const{name, email, password} =req.body;
        const user= await UserModel.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists", success: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bycrypt.hash(password, 10); // Hash the password
        await userModel.save();
        res.status(201).json({message: "User created successfully", success: true});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false, error: error.message});
    }
}

const login = async(req, res) => {
    try {
        const{ email, password} =req.body;
        const user= await UserModel.findOne({email});
        const errorMsg ="Email or password is incorrect";        
        if(!user){
            return res.status(403).json({message: errorMsg, success: false});
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(403).json({message: errorMsg, success: false});
        }
        const jwttoken = jwt.sign({email:user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'}); // Generate JWT token

        res.status(200).json({message: "login successfully", success: true , token: jwttoken, user: {name: user.name, email: user.email, id: user._id}});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false, error: error.message});
    }
}

module.exports= {singup , login};