/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { BiChevronLeft } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async (token) => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    if (token) {
      getEnrolledCourses(token);
    }
  }, [token]);
  console.log(enrolledCourses);

  if (enrolledCourses === null)
    return <div className="grid h-full w-full place-content-center"></div>;
  return (
    <>
      <div className="p-10 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-2 text-sm text-richBlack-300"
        >
          <BiChevronLeft />
          Back
        </button>
        <h1 className="mt-3 text-3xl text-richBlack-5">Enrolled Courses</h1>
        <div className="mt-6 max-w-maxContent">
          {/* headings */}
          <div className="flex rounded-t-lg bg-richBlack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {!enrolledCourses.length ? (
            <div className=" flex justify-center items-center m-10 text-2xl">
              Your are not enrolled in any of the courses yet
            </div>
          ) : (
            enrolledCourses.map((course) => (
              <EnrolledCourseCard course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default EnrolledCourses;

function EnrolledCourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center border border-richBlack-700`}>
      <div
        className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
        onClick={() => {
          navigate(
            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
          );
        }}
      >
        <img
          src={course.thumbnail}
          alt="course_img"
          className="h-14 w-14 rounded-lg object-cover"
        />
        <div className="flex max-w-xs flex-col gap-2">
          <p className="font-semibold">{course.courseName}</p>
          <p className="text-xs text-richBlack-300">
            {course.courseDescription.length > 50
              ? `${course.courseDescription.slice(0, 50)}...`
              : course.courseDescription}
          </p>
        </div>
      </div>
      <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
      <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
        <div>
          <p>Progress: {course.progressPercentage || 0}%</p>
          <ProgressBar
            completed={course.progressPercentage || 0}
            height="8px"
            isLabelVisible={false}
          />
        </div>
      </div>
    </div>
  );
}
