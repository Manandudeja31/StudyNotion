import React from "react";
import instructor from "../../../assets/Images/instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
const InstructorSection = () => {
  return (
    <div className="mt-16 mb-16">
      <div className="flex flex-col md:flex-row text-center gap-20 justify-center items-center">
        <div className="">
          <img src={instructor} />
        </div>
        <div className="md:w-[50%] flex flex-col justify-center items-center gap-10">
          <div className="text-4xl font-semibold max-w-xs">
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
