const Section = require("../models/Section");
const Course = require("../models/Course");
const { BadRequestError, CustomAPIError } = require("../errors");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //validate
    if (!sectionName || !courseId)
      throw new BadRequestError("Missing Properties");
    //create section
    const section = await Section.create({ sectionName });
    //update course with section id
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { courseContent: section._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: updatedCourse,
      updatedCourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to create Section.",
    });
  }
};

//update courses
exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId, courseId } = req.body;
    //data validation
    if (!sectionName || !sectionId)
      throw new BadRequestError("Missing Properties");
    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // eslint-disable-next-line no-unused-vars
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    res.status(200).json({
      success: true,
      message: section,
      data: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to Update Section.",
    });
  }
};

//delete a section
exports.deleteSection = async (req, res) => {
  try {
    //get Id
    const { sectionId, courseId } = req.body;
    //delete
    await Section.findByIdAndDelete(sectionId);
    //TODO:delete the section id from course schema
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();
    if (!updatedCourse)
      throw new CustomAPIError("Error in deleting section entry from course");

    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });
    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to Delete Section.",
    });
  }
};
