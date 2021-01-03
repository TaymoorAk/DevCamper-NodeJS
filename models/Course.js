const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please Add a Course Title"],
  },
  description: {
    type: String,
    required: [true, "Please Add a Description"],
  },
  weeks: {
    type: String,
    required: [true, "Please Add Number of Weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please Add Tuition Cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please Add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});
module.exports = mongoose.model("Course", CourseSchema);
