/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import IconBtn from "../../common/IconBtn";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [subSection, setSubSection] = useState(null);
  const navigate = useNavigate();
  const { courseId, sectionId, subSectionId } = useParams();
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  console.log("courseSectionData:", courseSectionData);
  console.log("CourseEntireData:", courseEntireData);
  console.log("totalNoOflect:", totalNoOfLectures);
  console.log("completelect:", completedLectures);

  useEffect(() => {
    const setActiveFlag = () => {
      if (!courseSectionData?.length) return;

      const currentSectionIndex = courseSectionData?.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //   set current sub section
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlag();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleSubSection = (id) => {
    setSubSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="text-white">
      <div className="w-full h-screen md:h-full border-r bg-[#161D29]">
        {/* for buttons & headings */}
        <div className="border-b border-richBlack-400 p-5">
          {/* for buttons */}
          <div className="flex justify-between border-b border-richBlack-400 pb-2">
            <button
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
              className="text-white"
            >
              <IoChevronBackCircleOutline className="h-10 w-10 text-richBlack-200" />
            </button>
            <div>
              <IconBtn
                text={"Add Review"}
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>
          {/* for heading and title */}
          <div className="flex gap-2 pt-5">
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length}/{totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and subsections */}
        <div>
          {courseSectionData?.map((course, id) => (
            <div className="flex flex-col" key={id}>
              <div className="flex justify-between items-center bg-richBlack-600 my-3 py-3 px-5">
                <div>{course?.sectionName}</div>
                <div className="flex gap-2 items-center ">
                  <p className=" text-sm">
                    {course?.subSection?.timeDuration}51min
                  </p>
                  <button onClick={() => handleSubSection(id)}>
                    {subSection === id ? (
                      <RiArrowDropUpLine className="h-8 w-8" />
                    ) : (
                      <RiArrowDropDownLine className="h-8 w-8" />
                    )}
                  </button>
                </div>
              </div>
              {subSection === id && (
                <div>
                  {course?.subSection?.map((sub, index) => (
                    <div
                      className={`flex gap-2 cursor-pointer items-center px-5 
                        ${
                          videoBarActive === sub._id
                            ? "bg-yellow-200 text-richBlack-900"
                            : "bg-richBlack-900 text-white"
                        }`}
                      key={index}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseId}/section/${course?._id}/sub-section/${sub._id}`
                        );
                        setVideoBarActive(sub?._id);
                      }}
                    >
                      <input
                        // readOnly={true}
                        type="checkbox"
                        checked={completedLectures?.includes(sub?._id)}
                      />
                      <p>{sub?.title}</p>
                      <FaVideo />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
