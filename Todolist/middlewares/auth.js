const jwt = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        message: "Access denied.",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid Token",
      success: false,
    });
  }
};
module.exports = { checkAuth };
