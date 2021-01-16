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
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log("Calculating avg cost...".blue);

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: `$tuition` },
      },
    },
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.log(err);
  }
};
//Call Get Average After Save
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});
//Call Get Average Before Remove
CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
