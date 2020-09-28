//Reuired
const express = require('express');
const { createBootcamps, updateBootcamps, deleteBootcamps, getBootcamps, getBootcamp, getBootcampsInRadius } = require("../controllers/bootcamps");
const router = express.Router();

//Routes
router.route("/").get(getBootcamps).post(createBootcamps);
router.route("/:id").get(getBootcamp).delete(deleteBootcamps).put(updateBootcamps);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)
module.exports = router;