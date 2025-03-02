/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-stars";
export default function RenderCartCourses({ course }) {
  // const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        key={course._id}
        className="flex gap-2 border-spacing-10 
        flex-col rounded-lg border border-richBlack-600 p-2 md:flex-row"
      >
        <img
          className="mx-auto rounded-lg"
          width={185}
          src={course?.thumbnail}
          alt="courseThumbnail"
        />
        <div className="flex-grow space-y-2">
          <h3 className="text-lg">{course?.courseName}</h3>
          <h4 className="text-richBlack-200">{course?.category?.name}</h4>
          <div className="flex items-center gap-4">
            {/* {course?.ratingAndReviews} */}
            <ReactStars
              value={4.8}
              count={5}
              edit={false}
              size={20}
              color2={"#ffd700"}
            />
            <span>{course?.ratingAndReviews?.length} Ratings</span>
          </div>
          <p className="text-richBlack-300">
            Total Courses • Lesson • Beginner
          </p>
        </div>
        <div className="flex flex-row-reverse justify-around gap-2 md:flex-col">
          <button
            onClick={() => dispatch(removeFromCart(course?._id))}
            className="flex items-center gap-2 rounded border border-richBlack-500 bg-richBlack-700 px-3 py-1 text-xl text-pink-400"
          >
            <RiDeleteBinFill />
            Remove
          </button>
          <p className="text-2xl font-semibold text-yellow-50">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </div>
  );
}
