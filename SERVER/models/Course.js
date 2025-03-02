const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Please provide course name"],
      minlength: 1,
      maxLength: 100,
    },
    courseDescription: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 1,
      maxLength: 1000,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whatYouWillLearn: {
      type: String,
      required: [true, "Please provide whatYouWIllLearn"],
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    price: { type: Number, required: [true, "Please provide course price"] },
    thumbnail: { type: String },

    tag: {
      type: [String],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      //FIXME: required: [true, "Please provide a Category name"],
    },
    studentsEnrolled: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    instructions: { type: [String] },
    status: {
      type: String,
      enum: ["Draft", "Pending", "Published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
