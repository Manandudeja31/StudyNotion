const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { BadRequestError, NotFoundError } = require("../errors");
const {
  uploadImageToCloudinary,
  deleteMediaFromCloudinary,
} = require("../utils/cloudinary");
//create subsection

exports.createSubsection = async (req, res) => {
  try {
    //fetch data from request body
    const {
      sectionId,
      title,
      timeDuration = Date.now(),
      description,
    } = req.body;
    //extract file/video
    const video = req.files?.video;
    //validation
    if (!sectionId || !title || !description || !video)
      throw new BadRequestError("All fields are required");
    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //create a subsection
    const subSection = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoUrl: uploadDetails.secure_url,
    });
    //update section with subsection id
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSection._id } },
      { new: true }
    )
      .populate("subSection")
      .exec();

    res.status(200).json({
      success: true,
      message: "subsection created successfully",
      updatedSection,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: "Unable to create Sub Section.",
      err: err.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    //fetch details
    const { subSectionId, sectionId, title, description } = req.body;
    if (!subSectionId) throw new BadRequestError("Subsection id not provided");
    if (!sectionId) throw new BadRequestError("Section id not provided");

    const subSection = await SubSection.findById(subSectionId);

    const fieldsToBeUpdated = {};
    if (title) fieldsToBeUpdated.title = title;
    if (description) fieldsToBeUpdated.description = description;
    //destroy video from cloudinary and update with the new one if video is to be updated
    const video = req.files?.video;

    if (video) {
      if (subSection.videoUrl) await deleteMediaFromCloudinary();
      //update to the database with new Image also
      // updateVideo
      const updatedVideo = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      fieldsToBeUpdated.videoUrl = updatedVideo.secure_url;
      fieldsToBeUpdated.timeDuration = updatedVideo.duration;
    }

    //update with database
    const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
      ...fieldsToBeUpdated,
    });
    if (!updatedSubSection)
      throw new NotFoundError("Subsection not found with provided id");

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();
    //return response
    res.status(200).json({
      success: true,
      message: "subSection update successfully",
      data: updatedSection,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    // first deleting its entry from the section
    if (!subSectionId || !sectionId)
      throw BadRequestError("Provide all the required fields");
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();
    if (!section) throw new BadRequestError("Section not found with sectionId");

    // then deleting it from the db
    const subSection = await SubSection.findByIdAndDelete(subSectionId);
    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    //TODO: delete media video on cloudinary
    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete SubSection.",
    });
  }
};
