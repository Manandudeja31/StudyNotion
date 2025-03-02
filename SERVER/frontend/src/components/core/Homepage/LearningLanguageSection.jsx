import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/know_your_progress.svg";
import compare_with_others from "../../../assets/Images/compare_with_others.svg";
import plan_your_lessons from "../../../assets/Images/plan_your_lessons.svg";
import CTAButton from "./Button";
const LearningLanguageSection = () => {
  return (
    <div className=" mt-[130px]">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-3xl text-center font-semibold">
          Your swiss knife for
          <HighlightText text={" learning any language"} />
        </div>
        <div className="text-sm max-w-2xl text-center text-richBlack-600">
          <p>
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>
        <div className="flex lg:flex-row flex-col">
          <img
            src={know_your_progress}
            alt="know progress"
            className="object-contain -mr-32"
          />
          <img
            src={compare_with_others}
            className="object-contain"
            alt="compare"
          />
          <img
            src={plan_your_lessons}
            alt="plan"
            className=" object-contain sm:-ml-36   "
          />
        </div>
        <div className=" w-fit mb-20">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn more</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
export default LearningLanguageSection;
