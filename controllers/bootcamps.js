const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//@desc Getting all bootcamps
//@route GET /api/v1/bootcamps
//@access PUBLIC

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //pagination
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 100;
  // const skip = (page - 1) * limit;

  const query = query.skip(skip).limit(limit);
  const bootcamp = await Bootcamp.find();

  res.status(200).json({
    success: true,
    status: 200,
    data: bootcamp,
    count: bootcamp.length,
  });
});
//@desc Getting single bootcamps
//@route GET /api/v1/bootcamps/:id
//@access PUBLIC

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(200).json({
    success: true,
    status: 200,
    data: bootcamp,
  });
  if (!bootcamp) {
    next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
});
//@desc Creating a bootcamp
//@route POST /api/v1/bootcamps
//@access PRIVATE

exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    message: "Bootcamp Added",
  });
});
//@desc Updating a bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access PRIVATE

exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json({
    success: true,
    data: bootcamp,
  });
});
//@desc Deleting a bootcamp
//@route Delete /api/v1/bootcamps/:id
//@access PRIVATE

exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc Get Bootcamp Within a Radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access PRIVATE

exports.getBootcampsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //getting longitude and latitude from geocoder
  const loc = geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  //calculating Earth radius using radian
  //Divide Distance by radius of earth
  // Earth Radius  =  3,963 mi / 6, 378 km
  const radius = distance / 3963;

  const bootcamps = Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    const: bootcamps.length,
    data: bootcamps,
  });
};
