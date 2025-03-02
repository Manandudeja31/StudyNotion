/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth

exports.auth = async (req, res, next) => {
  try {
    // Extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing, return response
    if (!token) {
      console.log("Token is missing");
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      console.log("Verifying token...");
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decode);
      req.user = decode;
      console.log("Token verification successful");
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a proctected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a proctected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log(req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a proctected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
