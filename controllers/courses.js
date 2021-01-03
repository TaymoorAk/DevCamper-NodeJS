const Course = require("../models/Course");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//@desc Getting all Courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamp/:bootcampId/courses
//@access PUBLIC
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = await Course.find().populate("bootcamp");
  }

  const courses = query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});