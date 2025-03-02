/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { useForm } from "react-hook-form";
import { createRating } from "../../../services/operations/courseDetailsApi";
const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData?._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(null);
  };

  return (
    <div
      className="z-[1000] bg-opacity-10 fixed overflow-auto inset-36 flex flex-col items-center 
    justify-center backdrop-blur-sm text-white h-fit"
    >
      <div
        className="flex flex-col w-11/12 items-center justify-center max-w-[450px] 
      rounded-sm border border-richBlack-400 bg-richblack-800"
      >
        <div className="bg-richBlack-800 flex justify-between items-center w-full p-5">
          <p className="font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(null)}>X</button>
        </div>
        <div className="bg-richBlack-900 w-full">
          <div className="flex gap-3 pt-3 justify-center items-center">
            <img src={user.image} alt="UserImage" className="h-10 w-10" />
            <div className="flex flex-col text-xs">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p className="text-richBlack-300">Posting Publicly</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars
              count={5}
              size={24}
              onChange={ratingChanged}
              color2={"#ffd700"}
              className="flex items-center justify-center"
            />
            <div className="flex flex-col m-2">
              <label className="text-xs" htmlFor="courseExperience">
                Add Your Experience <span className=" text-pink-300">*</span>
              </label>
              <textarea
                id="courseExperience"
                type="text"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="bg-richBlack-700 min-h-[130px] w-full p-2 rounded-lg text-sm"
              />
              {errors.courseExperience && (
                <span>Please Add Your Experience.</span>
              )}
            </div>
            <div className="gap-3 flex justify-end pb-2 m-2">
              <button
                className="bg-richBlack-500 text-black px-5 py-3 rounded-lg 
            font-semibold"
                onClick={() => setReviewModal(null)}
              >
                Cancel
              </button>
              <button className="bg-yellow-50 text-black px-5 py-3 font-semibold rounded-lg">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
