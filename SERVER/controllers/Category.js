/* eslint-disable no-unused-vars */
const { BadRequestError, NotFoundError } = require("../errors");
const Category = require("../models/Category");
const Courses = require("../models/Course");
//handler for create Category
exports.createCategory = async (req, res) => {
  try {
    //fetch
    const { name, description } = req.body;
    //validate
    if (!name || !description)
      throw new BadRequestError("Provide both name and description");
    //create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
//get All categories
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      data: categories,
      message: "All Categories returned successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

//category page details //get selected category details different categories details and top selling categories
exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
    const { categoryId } = req.body;
    //get courses for specified category id
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    if (!selectedCategory)
      throw new NotFoundError("Courses for selected category not found");
    //get courses for different category id
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();
    if (!differentCategories)
      throw new NotFoundError("Courses for different category not found");
    //get courses for top selling category id
    const topSellingCourses = await Courses.find({ status: "Published" })
      .sort({
        studentsEnrolled: -1,
      })
      .limit(10);
    if (!topSellingCourses)
      throw new NotFoundError("Courses for top selling category not found");
    // get most selling courses
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    // console.log("Selected Category:", selectedCategory);
    // console.log("Different Categories:", differentCategories);
    // console.log("Top Selling Courses:", topSellingCourses);
    // console.log("Most Selling Courses:", mostSellingCourses);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
        mostSellingCourses,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
