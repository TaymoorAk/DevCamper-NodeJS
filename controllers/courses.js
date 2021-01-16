const Course = require("../models/Course");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

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

//@desc Getting Single Course
//@route GET /api/v1/courses/:id
//@access PUBLIC
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  // .populate({
  //   path: "bootcamp",
  //   select: "name select",
  // });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});

//@desc Add Course
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access PRIVATE
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      newErrorResponse(`No bootcamp found by id of ${req.params.bootcampId}`),
      404
    );
  }

  const course = await Course.create(req.body);
  console.log(course);
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc Update Course
//@route PUT /api/v1/courses/:id
//@access PRIVATE
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      newErrorResponse(`No Course found by Id of ${req.params.id}`),
      404
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(course);
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc Delete Course
//@route Delete /api/v1/courses/:id
//@access PRIVATE
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      newErrorResponse(`No Course found by Id of ${req.params.id}`),
      404
    );
  }

  await course.remove();
  console.log(course);
  res.status(200).json({
    success: true,
    data: course,
  });
});
