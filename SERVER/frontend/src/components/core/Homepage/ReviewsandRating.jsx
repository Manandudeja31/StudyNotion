import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apis";
import ReactStars from "react-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
const { REVIEWS_DETAILS_API } = ratingsEndpoints;
const ReviewsandRating = () => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const getRatings = async () => {
      try {
        const res = await apiConnector("GET", REVIEWS_DETAILS_API);
        console.log(res);
        if (res) {
          setReviews(res?.data?.data);
        } else {
          setReviews("No Reviews Found");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRatings();
  }, []);

  return (
    <div className="md:m-10 m-5 ">
      <Swiper
        mousewheel={{
          enabled: true,
          forceToAxis: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        allowSlidePrev={true}
        slidesPerView={1}
        loop={true}
        spaceBetween={20}
        pagination={false}
        className="mySwiper md:pt-5"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-size": "20px",
        }}
        freeMode={false}
        rewind={false}
        centeredSlides={true}
        navigation={false}
        breakpoints={{
          300: { slidesPerView: 1.2, spaceBetween: 10 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.1 },
        }}
      >
        {reviews?.map((review, id) => (
          <SwiperSlide key={id}>
            <div className="flex flex-col min-h-[250px] md:min-h-[220px] p-5 bg-richBlack-800 text-base text-richBlack-25">
              <div className="flex gap-2 items-center">
                <img
                  src={review?.user?.image}
                  alt="Profile"
                  className="h-10 w-10"
                />
                <div className="flex flex-col">
                  <p>
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                  <p className="text-richBlack-400">{review?.user?.email}</p>
                  <p className="text-richBlack-400">
                    Course: {review?.course?.courseName}
                  </p>
                </div>
              </div>
              <div className="text-richBlack-25">
                <p>{review?.review?.slice(0, 120)}</p>
              </div>
              <div className="flex gap-3 items-center absolute bottom-5">
                <p className="text-[#ffd700] pt-2">{review?.rating}</p>
                <ReactStars
                  count={5}
                  size={24}
                  value={review?.rating}
                  edit={false}
                  color2={"#ffd700"}
                  className="flex"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsandRating;
