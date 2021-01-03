const mongoose = require("mongoose");

const BootCampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please Add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can't be more than 50 Characters"],
    },
    slug: String,
    description: {
      type: String,
      required: ["true", "Please Add a description"],
      maxlength: [500, "Description can't be more than 500 Characters"],
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can't be longer than 20 digits"],
    },
    email: {
      type: "String",
    },
    address: {
      type: String,
      required: [true, "Please add an Address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be atleast 1"],
      max: [10, "Rating can't be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
BootCampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});
module.exports = mongoose.model("Bootcamp", BootCampSchema);
