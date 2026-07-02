const userModel = require("../models/user.model");
let bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const registerService = require("../services/auth.service");

let registerController = async (req, res) => {
  let {accessToken,refreshToken,newUser} = await registerService(req.body)

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
