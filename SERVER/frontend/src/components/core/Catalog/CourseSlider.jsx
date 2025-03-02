/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Coursecard from "./Coursecard";
const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={25}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {Courses.map((course, id) => (
            <SwiperSlide key={id}>
              <Coursecard
                course={course}
                Height={"h-[250px]"}
                Width={"w-full"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found.</p>
      )}
    </>
  );
};

export default CourseSlider;
