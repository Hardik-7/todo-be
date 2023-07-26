const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

// register user
exports.signup = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      statusCode: 400,
      message: "Please enter a username and password !",
    });
  }
  const isExist = await User.findOne({ username });
  if (isExist) {
    return next({
      statusCode: 400,
      message: "User already registered with this username !",
    });
  }
  const user = await User.create(req.body);
  return res.status(201).json({
    success: true,
    message: "signup successfully",
    data: user,
    token: user.getJwtToken(),
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      statusCode: 400,
      message: "Please enter a username and password !",
    });
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next({ statusCode: 403, message: "Invaild username!" });
  }
  if (!(await user.comparePassword(password))) {
    return next({ statusCode: 403, message: "Invaild Password!" });
  }
  return res.status(201).json({
    success: true,
    message: "signin successfully",
    data: user,
    token: user.getJwtToken(),
  });
});
