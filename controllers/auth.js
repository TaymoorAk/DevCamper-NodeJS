const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//@desc Register user
//@route POST /api/v1/auth
//@access PUBLIC

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token: token });
});
