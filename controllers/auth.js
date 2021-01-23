const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//@desc Register user
//@route POST /api/v1/auth
//@access PUBLIC

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token: token });
  sendTokenResponse(user, 200, res);
});
//@desc Register user
//@route GET /api/v1/auth
//@access PUBLIC

exports.login = asyncHandler(async (req, res, next) => {
  console.log("Login Ran");
  const { email, password } = req.body;

  if (!email || !password) {
    return next(newErrorResponse("Please Provide an email and Password"), 400);
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials"), 401);
  }

  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token: token });
  sendTokenResponse(user, 200, res);
});

//@desc Get Current User
//@route POST /api/v1/auth/me
//@access Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
const sendTokenResponse = async (user, statusCode, res) => {
  //Create Token
  const token = await user.getSignedJwtToken();
  console.log(token);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
  });
};
