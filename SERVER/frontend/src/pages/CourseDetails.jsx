/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImInfo } from "react-icons/im";
import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../services/operations/courseDetailsApi";
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "../components/common/RatingStars";
import formatDate from "../services/formatDate";
import GetAvgRating from "../utils/avgRating";
import { IoGlobeOutline } from "react-icons/io5";
import CourseDetailsCard from "../components/core/Courses/CourseDetailsCard";
import CourseContent from "../components/core/Courses/CourseContent";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  useEffect(() => {
    const getCourseDetails = async () => {
      const res = await fetchCourseDetails(courseId, dispatch);
      setCourseDetails(res);
    };
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseDetails]);

  return (
    <div className="text-white">
      <div className="flex flex-col lg:relative justify-center items-center">
        <div className="bg-richBlack-800 w-full px-5 py-10 text-lg">
          <div className="pb-3 w-auto lg:w-[600px] xl:w-[800px] lg:border-r-2 border-richBlack-600">
            <p className="text-richBlack-200 hidden lg:block">
              Home/Learning/
              <span className="text-yellow-50">
                {courseDetails?.category?.name}
              </span>
            </p>
            <div>
              <img
                src={courseDetails?.thumbnail}
                alt="thumbnail"
                className="h-[200px] w-auto mx-auto block lg:hidden"
              />
            </div>
            <p className="text-richBlack-5 text-3xl pt-2">
              {courseDetails?.courseName}
            </p>
            <p className="text-richBlack-200 pt-2">
              {courseDetails?.courseDescription}
            </p>
          </div>
          <div className="flex text-richBlack-5 gap-1 w-auto lg:w-[600px] xl:w-[800px] lg:border-r-2 border-richBlack-600">
            <span>{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="pl-1">
              ({courseDetails?.ratingAndReviews?.length} Ratings)
            </span>
            <span className="pl-2">
              {courseDetails?.studentsEnrolled.length === 0 && 0} students
            </span>
          </div>
          <p className="text-richBlack-5 pt-2  w-auto lg:w-[600px] xl:w-[800px] lg:border-r-2 border-richBlack-600">
            Created By {courseDetails?.instructor?.firstName}{" "}
            {courseDetails?.instructor?.lastName}
          </p>
          <div className="flex gap-2 text-richBlack-5 w-auto lg:w-[600px] xl:w-[800px] lg:border-r-2 border-richBlack-600">
            <p className="flex items-center justify-center gap-1 pt-2">
              <ImInfo />
              Created at {formatDate(courseDetails?.createdAt)}
            </p>
            <p className="flex items-center justify-center gap-1 pt-2">
              <IoGlobeOutline />
              English
            </p>
          </div>
        </div>
        <div className="relative w-full lg:w-[350px] lg:absolute lg:top-10 lg:mx-16 lg:right-0">
          <CourseDetailsCard
            course={courseDetails}
            token={token}
            user={user}
            navigate={navigate}
            dispatch={dispatch}
            courseId={courseId}
          />
        </div>
      </div>
      <div className="border p-5 w-auto lg:w-[550px] xl:w-[800px] mx-5 my-10">
        <p className="text-3xl">What You'll Learn</p>
        <p className="p-2 text-richBlack-100">
          {courseDetails?.whatYouWillLearn}
        </p>
      </div>
      <div>
        <CourseContent course={courseDetails} />
      </div>
    </div>
  );
};

export default CourseDetails;
