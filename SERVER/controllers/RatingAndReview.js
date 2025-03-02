const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
// eslint-disable-next-line no-unused-vars
const User = require("../models/User");
const { BadRequestError, ForbiddenError } = require("../errors");
const { default: mongoose } = require("mongoose");

//create rating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //fetch data from req body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails)
      throw new BadRequestError("Student not enrolled in this course");

    //check if user is already reviewed or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      throw new ForbiddenError("User already reviewed this course");
    }
    //create rating and review
    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    //update course with this rating and review
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingAndReview._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingAndReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Rating and review not created successfully.",
    });
  }
};
//get average rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course id
    const courseId = req.body.courseId;
    //calculate average rating
    const result = await RatingAndReview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);

    if (result.length > 0) {
      res
        .status(200)
        .json({ success: true, averageRating: result[0].averageRating });
    } else {
      res.status(200).json({
        success: true,
        message: "No rating given till now",
        averageRating: 0,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get course average rating and review.",
    });
  }
};

//get all rating
exports.getAllRating = async (req, res) => {
  try {
    const allRatingAndReview = await RatingAndReview.find({})
      .sort("-rating")
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();
    res.status(200).json({
      success: true,
      data: allRatingAndReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all rating and review.",
    });
  }
};
//get rating of a course
exports.getRating = async (req, res) => {
  //TODO:}
  try {
    const courseId = req.body.courseId;
    const courseRatingAndReview = await RatingAndReview.findById(courseId)
      .sort("-rating")
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();
    res.status(200).json({
      success: true,
      data: courseRatingAndReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get course rating and review.",
    });
  }
};
