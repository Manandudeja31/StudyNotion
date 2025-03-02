/* eslint-disable no-unused-vars */
import React from "react";
import CTAButton from "../Homepage/Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} justify-between items-center lg:gap-40 gap-10`}
    >
      {/* Section1 */}
      <div className="w-full md:w-[50%] flex flex-col gap-2 max-w-lg">
        {heading}
        <div className=" text-richBlack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className=" h-fit flex flex-row text-[15px] w-[100%] py-4 
      lg:w-[500px] border"
      >
        {/* Hw create background gradient */}

        <div
          className="text-center flex flex-col w-[10%]
                 text-richBlack-400 font-inter font-bold"
        >
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-full flex flex-col gap-2 font-bold font-mono 
                ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
