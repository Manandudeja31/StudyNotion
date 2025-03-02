/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsApi.js";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice.js";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar.jsx";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal.jsx";
const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData?.courseDetails));
      dispatch(setCompletedLectures(courseData?.completeVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <div>
      <div className="md:flex md:flex-row flex flex-col-reverse">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="w-full md:m-10">
          <Outlet />
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </div>
  );
};

export default ViewCourse;
