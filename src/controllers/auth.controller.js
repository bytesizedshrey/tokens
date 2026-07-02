const userModel = require("../models/user.model");
let bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

let registerController = async (req, res) => {
  let { name, email, password } = req.body;

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

    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        sameSite: "lax",
        secure : false,
        maxAge : 10 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        sameSite: "lax",
        secure : false,
        maxAge : 24  * 60 * 60 *1000
    })

    return res.status(201).json({
        message : 'User registered successfully',
        newUser
    })
};

let loginController = async (req, res) => {};

module.exports = {
  registerController,
  loginController,
};
