/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourses/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsApi";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl m-5">Edit Course</h1>
      <div className="md:mx-40 ">
        {course ? <RenderSteps /> : <p>Course not found</p>}
      </div>
    </div>
  );
};

export default EditCourse;
