import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div className="">
      <button
        onClick={() => setCurrentCard(cardData.heading)}
        className={`relative mt-3 text-left text-richBlack-700 w-[350px] 
        h-[300px] ${
          currentCard === cardData.heading
            ? "bg-white shadow-[_10px_10px_0px_0px] shadow-yellow-50"
            : "bg-richBlack-800"
        }`}
      >
        <div className=" relative pb-5 border-b-2 border-dashed border-spacing-5 border-opacity-75 ml-4 mr-4">
          <div
            className={`font-semibold pb-2 ${
              currentCard === cardData.heading
                ? "text-richBlack-900"
                : "text-richBlack-5"
            }  pt-5 text-md`}
          >
            {cardData.heading}
          </div>
          <p className=" text-sm text-richBlack-300 pb-28">
            {cardData.description}
          </p>
        </div>

        <div
          className={`flex flex-row gap-40 ${
            currentCard === cardData.heading
              ? "text-blue-500"
              : "text-richBlack-5"
          } px-4 py-5`}
        >
          <p className="flex gap-2">
            <BsFillPeopleFill />

            {cardData.level}
          </p>

          <p
            className={`flex gap-2 ${
              currentCard === cardData.heading
                ? "text-blue-500"
                : "text-richBlack-5"
            } `}
          >
            <MdPlayLesson />
            {cardData.lessonNumber}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CourseCard;
