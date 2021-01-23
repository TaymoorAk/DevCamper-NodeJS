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
const { protect, authorize } = require("../middlewares/auth");
const courseRouter = require("./courses");

//Resource Routes
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamps);
router
  .route("/:id")
  .get(getBootcamp)
  .delete(protect, deleteBootcamps)
  .put(protect, updateBootcamps);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
module.exports = router;
