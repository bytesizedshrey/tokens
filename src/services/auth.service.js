const userModel = require("../models/user.model");
let brypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

let registerService = async (data) => {
    let { name, email, password } = data;
    try {
        if (!email || !password)
            return res.status(400).json({
              message: "All fields are required",
            });
        
            let isExisted = await userModel.findOne({
                email,
            })
        
            if(isExisted)
                return res.status(409).json({
                message : 'User already exists with this email'        
            })
        
            let hashPass = bcrypt.hashSync(password,10)
        
            let newUser = await userModel.create({
                name,
                email,
                password : hashPass,
            })
        
            let accessToken = generateAccessToken(newUser._id);
            let refreshToken = generateRefreshToken(newUser._id);

            return {
                accessToken,refreshToken,newUser
            }

    } catch (error) {
        throw new Error(error)
    }
}

module.exports=registerService