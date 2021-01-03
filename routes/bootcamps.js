//Reuired
const express = require("express");
const {
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcamps,
  getBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");
const router = express.Router();
const courseRouter = require("./courses");

//Resource Routes
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamps);
router
  .route("/:id")
  .get(getBootcamp)
  .delete(deleteBootcamps)
  .put(updateBootcamps);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
module.exports = router;
