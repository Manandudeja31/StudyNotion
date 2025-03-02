const express = require("express");
const router = express.Router();
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  getUserEnrolledCourses,
  updateDisplayPicture,
  getInstructorData,
} = require("../controllers/Profile");
const { auth, isInstructor } = require("../middlewares/auth");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

router.get("/getUserEnrolledCourses", auth, getUserEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getInstructorData", auth, isInstructor, getInstructorData);

module.exports = router;
