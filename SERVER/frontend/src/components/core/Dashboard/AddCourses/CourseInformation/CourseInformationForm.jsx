/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import IconBtn from "../../../../common/IconBtn";
import RequirementField from "./RequirementField";
import {
  setStep,
  setCourse,
  setEditCourse,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Tags from "./Tags";
import Upload from "../Upload";
export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course?.courseName);
      setValue("courseShortDesc", course?.courseDescription);
      setValue("coursePrice", course?.price);
      setValue("courseTags", course?.tag);
      setValue("courseBenefits", course?.whatYouWillLearn);
      setValue("courseCategory", course?.category._id);
      setValue("courseRequirements", course?.instructions);
      setValue("courseThumbnail", course?.thumbnail);
    }
    getCategories();
  }, []);

  function isFormUpdated() {
    console.log(course.thumbnail);
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course?.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseThumbnail !== course.thumbnail ||
      currentValues.courseBenefits !== course.whatYouWillLearn
    );
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course?.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course?.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course?.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenefits !== course?.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course?.category._id) {
          formData.append("category", data.courseCategory);
        }
        console.log("Category", data.courseCategory);
        if (currentValues.courseTags !== course?.courseTags) {
          formData.append("tag", JSON.stringify(data.courseTags));
          console.log("Tag:", data.courseTags);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course?.instructions.toString()
        ) {
          formData.append("instructions", data.courseRequirements);
        }
        setLoading(true);
        console.log(formData);
        const result = await editCourseDetails({
          formData,
          courseId: course._id,
          token,
        });
        console.log("Result:", result);
        setLoading(false);
        if (result) {
          dispatch(setEditCourse(false));
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made so far");
      }
      return;
    }

    //create a new course
    console.log("creating course");
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("tag", JSON.stringify(data.courseTags));
    console.log(JSON.stringify(data.courseTags));
    formData.append("thumbnail", data.courseThumbnail);
    console.log(data?.courseThumbnail);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richBlack-700 bg-richBlack-800 p-5 space-y-8 
      w-[380px] md:w-[480px] mx-5 mb-10 md:ml-20"
    >
      <div>
        <label htmlFor="courseTitle" className="text-white">
          Course Title<sup className=" text-pink-500">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full bg-richBlack-700 mb-2 p-2 rounded-lg text-richBlack-5"
        />
        {errors.courseTitle && (
          <span className="text-yellow-50">Course Title is Required</span>
        )}
      </div>
      <div>
        <label htmlFor="courseShortDesc" className="text-white">
          Course Description<sup className=" text-pink-500">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="w-full min-h-[140px] bg-richBlack-700 mb-2 p-2 rounded-lg text-richBlack-5"
        />
        {errors.courseShortDesc && (
          <span className="text-yellow-50">Course Description is Required</span>
        )}
      </div>
      <div className="relative">
        <label htmlFor="coursePrice" className="text-white">
          Course Price<sup className=" text-pink-500">*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })}
          className="w-full bg-richBlack-700 mb-2 p-2 pl-7 rounded-lg text-richBlack-5"
        />
        <HiOutlineCurrencyRupee className="absolute top-9 text-richBlack-5 ml-2" />
        {errors.courseTitle && (
          <span className="text-yellow-50">Course Price is Required</span>
        )}
      </div>
      <div>
        <label htmlFor="courseCategory" className="text-white">
          Course Category <sup className=" text-pink-500"> *</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory")}
          className="bg-richBlack-700 w-full mt-2 p-2 rounded-lg text-richBlack-5"
        >
          <option
            value=""
            disabled
            className=" bg-richBlack-700 mb-2 p-2 rounded-lg text-richBlack-5"
          >
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option
                key={index}
                value={category?._id}
                className="bg-richBlack-700 p-2 rounded-lg text-richBlack-5"
              >
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategories && (
          <span className="text-yellow-50">Course Category is Required</span>
        )}
      </div>
      {/* Tags */}
      <div>
        <Tags
          name="courseTags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      {/* Thumbnail */}
      <div>
        <Upload
          name="courseThumbnail"
          label="Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      {/* Benefits of course */}
      <div>
        <label htmlFor="courseBenefits" className="text-white">
          Benefits of the course<sup className=" text-pink-500">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="w-full min-h-[100px] bg-richBlack-700 mb-2 p-2 rounded-lg text-richBlack-5"
        />
        {errors.courseShortDesc && (
          <span className="text-yellow-50">Course Benefits is Required</span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div className="flex flex-col md:flex md:flex-row gap-3">
        <IconBtn type={"submit"} text={!editCourse ? "Next" : "Save Changes"} />
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex items-center justify-center gap-2 rounded-lg bg-richBlack-700 px-6 py-3
             text-richBlack-5 shadow-ctaButtonShadow "
          >
            Continue Without Saving
          </button>
        )}
      </div>
    </form>
  );
}
