import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className=" mt-10 text-center -mb-32">
      <div className="text-3xl font-semibold">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>

      <p className=" text-md mt-3 text-richBlack-300">
        Learn to Build Anything You Can Imagine
      </p>

      <div
        className="flex flex-row rounded-full bg-richBlack-800 mb-10 px-1 py-1
             border-richBlack-100 max-w-3xl mx-auto mt-10 justify-center items-center"
      >
        {tabsName.map((element, index) => {
          return (
            <div
              className={`text-[10px] md:text-[16px] flex flex-row items-center gap-1 
                            ${
                              currentTab === element
                                ? " bg-richBlack-900 text-richBlack-5 font-medium"
                                : " text-richBlack-200"
                            } rounded-full transition-all duration-200 cursor-pointer
                             hover:text-richBlack-5 px-3 md:px-7 py-2`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* course card ka group */}
      <div className=" flex flex-wrap gap-10 justify-center ">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
