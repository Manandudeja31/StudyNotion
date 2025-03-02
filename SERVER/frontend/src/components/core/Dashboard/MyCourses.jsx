/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsApi";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./Instructor Courses/CoursesTable";
const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <div className="flex justify-between mx-5 mb-10">
        <h1 className=" text-3xl">My Courses</h1>
        <IconBtn
          text="Add Courses"
          onclick={() => navigate("/dashboard/add-course")}
        />
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
