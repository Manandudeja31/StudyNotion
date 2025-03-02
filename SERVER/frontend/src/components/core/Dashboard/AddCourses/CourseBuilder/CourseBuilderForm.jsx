/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";
import NestedView from "./NestedView";
const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    // update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each Section");
      return;
    }
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div
      className="rounded-md border-richBlack-700  bg-richBlack-800 p-6 
    space-y-8 w-[380px] md:w-[500px] m-5 md:ml-10"
    >
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section Name <sup className="text-pink-500">*</sup>
          </label>
          <input
            type="text"
            placeholder="Add a section to build your course."
            id="sectionName"
            {...register("sectionName", { required: true })}
            className="w-full bg-richBlack-700 mb-2 p-2 rounded-lg text-richBlack-5"
          />
          {errors.sectionName && (
            <span role="alert" className="text-yellow-50">
              SectionName is required
            </span>
          )}
        </div>
        <div className="mt-5 flex ">
          <button
            type="Submit"
            className=" border border-yellow-50 p-3 flex text-yellow-50 justify-center 
            items-center gap-2 rounded-lg"
          >
            <IoAddCircleOutline className="font-bold" />
            {editSectionName ? "Edit Section Name" : "Create Section"}
          </button>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-white underline ml-5 border border-yellow-50 p-3 rounded-lg"
            >
              Cancel Exit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      <div className="flex justify-end gap-x-3">
        <button
          disabled={loading}
          onClick={goBack}
          className=" bg-richBlack-500 py-2 px-5 text-white font-semibold rounded-md cursor-pointer flex items-center"
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <FaArrowRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
