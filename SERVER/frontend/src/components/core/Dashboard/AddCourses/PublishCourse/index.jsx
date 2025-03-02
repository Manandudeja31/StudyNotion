/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { FaArrowLeft } from "react-icons/fa";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
  resetCourseState,
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsApi";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
    dispatch(setEditCourse(true));
  };

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  });

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form
      // no need to make api call
      goToCourses();
      return;
    }
    // if form updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };
  return (
    <div
      className="rounded-md border-[1px] w-[380px] m-5 md:w-[550px] bg-richBlack-800 p-6
     border-richBlack-700"
    >
      <p className="text-lg">Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="public"
            className="gap-2 flex items-center mt-3 text-richBlack-400"
          >
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded h-4 w-4 "
            />
            <span>Make this Course Public</span>
          </label>
        </div>
        <div className="flex justify-end gap-x-3 mt-5">
          <button
            disabled={loading}
            onClick={goBack}
            className=" bg-richBlack-500 gap-x-2 py-2 px-5 text-white font-semibold rounded-md cursor-pointer flex items-center"
          >
            <FaArrowLeft />
            Back
          </button>
          <IconBtn disabled={loading} text="Save and Publish" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
