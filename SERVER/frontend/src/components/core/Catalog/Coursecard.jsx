import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
const Coursecard = ({ course, Height, Width }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <div>
      <Link to={`/courses/${course?._id}`}>
        <div className="mx-5 pb-10">
          <img
            src={course?.thumbnail}
            alt="thumbnail"
            className={`${Height} ${Width} rounded-xl object-cover `}
          />
          <div className="px-3 py-2">
            <p>{course?.courseName}</p>
            <p>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex">
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="pl-2">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p>Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Coursecard;
