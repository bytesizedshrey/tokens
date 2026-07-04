const {
  registerService,
  loginService,
  getAccessTokenService,
} = require("../services/auth.service");

let registerController = async (req, res) => {
  try {
    let { accessToken, refreshToken, newUser } = await registerService(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

let loginController = async (req, res) => {
  try {
    let { accessToken, refreshToken, isExisted } = await loginService(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in",
      user: isExisted,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

let getAccessTokenController = async (req, res) => {
  try {
    let refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let accessToken = await getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access token generated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let logoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during logout",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getAccessTokenController,
  logoutController,
};
