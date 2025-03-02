import React from "react";
import instructor from "../../../assets/Images/instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="">
          <img
            src={instructor}
            alt="instructor"
            className=" shadow-xl shadow-blue-400"
          />
        </div>
        <div
          className="flex flex-col justify-center md:justify-start items-center 
        md:items-start text-center md:text-left gap-5"
        >
          <div className="text-4xl font-semibold">
            Become an
            <HighlightText text={" Instructor"} />
          </div>
          <p className=" max-w-xl font-medium text-[16px] text-richBlack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center fit">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
