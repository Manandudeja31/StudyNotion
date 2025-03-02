/* eslint-disable no-unused-vars */
const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//send otp
const sendOTP = async (req, res) => {
  try {
    //fetch email from req body
    const { email } = req.body;
    //check if user already exists ?
    if (!email) throw new BadRequestError("Email field is required");
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) throw new BadRequestError("User already exists");

    //generate Otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //TODO: check if otp is unique
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    //save otp in db
    const otpBody = await OTP.create({ email, otp });

    return res.status(200).json({
      success: true,
      msg: "otp sent successfully",
      otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error Not found.",
    });
  }
};

//sign up
const signUp = async (req, res) => {
  try {
    //data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //validate (mongoose validation is already present so no need to validate it)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    )
      throw new BadRequestError("All Fields are required");

    if (password !== confirmPassword)
      //check both passwords
      throw new BadRequestError("Password and confirm password do not match");

    //check if user already exists or not (mongoose already handling this validation)
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new BadRequestError(`User with email ${email} already exists`);
    //TODO: Handle 11000 duplicate error in db

    //Find otp in db and most recent otp
    const recentOtpResponse = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log("Recent OTP found: " + recentOtpResponse[0].otp);

    //validate otp
    if (recentOtpResponse.length === 0)
      throw new BadRequestError("OTP does not exists in db");
    if (otp !== recentOtpResponse[0].otp)
      throw new BadRequestError("OTP does not match");

    //create entry in db
    //create additional details
    const profileDetails = await Profile.create({
      //is it necessary cant we make empty profile
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber,
    });

    // Hash Password
    // const hashedPassword = bcrypt.hash(password, 10);

    //create the user
    let approved = ""; //FIXME:
    approved === "Instructor" ? (approved = false) : (approved = true);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      accountType,
      approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(201).json({
      success: true,
      user,
      message: "User is registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to sign up. Try again Later",
    });
  }
};

//Login
const login = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError(
        "Please provide both a valid email and password"
      );
    //find user with provided email
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) throw new UnauthenticatedError("User is not registered");
    //check passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthenticatedError("Password is not valid");
    //create JWT token
    if (isPasswordValid) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to Login. Try again Later",
    });
  }
};

//change password
const changePassword = async function (req, res) {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New Password cannot be same as Old Password",
      });
    }

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Study Notion - Password Updated",
        updatedUserDetails.email,
        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
module.exports = { sendOTP, signUp, login, changePassword };
