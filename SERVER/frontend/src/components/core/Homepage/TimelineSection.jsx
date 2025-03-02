import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/logo4.svg";
import timelineImage from "../../../assets/Images/timelineimage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Desciption: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Desciption: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Desciption: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Desciption: "Fully committed to the success company",
  },
];

const TimeLineSection = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col md:gap-16 gap-0 mt-10 items-center justify-center text-left mx-5">
        <div
          className="w-full mb-10 md:mb-0 md:w-[45%] flex flex-col 
        gap-5"
        >
          {timeline.map((element, index) => {
            return (
              <div
                className="flex flex-row gap-5 justify-center items-center"
                key={index}
              >
                <div
                  className="w-[50px] h-[50px] bg-white flex items-center rounded-full 
                justify-center"
                >
                  <img src={element.Logo} alt="element" />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Desciption}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative shadow-blue-200 w-full md:w-[45%]">
          <img
            src={timelineImage}
            alt="timeline"
            className=" shadow-pure-greys-5 object-cover h-fit"
          />

          <div
            className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase 
            py-5 px-5 left-[50%] translate-x-[-50%] translate-y-[-50%] h-24"
          >
            <div className="flex flex-row gap-5 items-center">
              <p className="text-3xl font-bold">10</p>
              <p className=" text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>
            <span
              className={`mx-8 h-full w-[0.2rem] 
                 bg-caribbeangreen-300`}
            ></span>
            <div className="flex gap-5 items-center">
              <p className="text-3xl font-bold">250</p>
              <p className=" text-caribbeangreen-300 text-sm">
                Type of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
