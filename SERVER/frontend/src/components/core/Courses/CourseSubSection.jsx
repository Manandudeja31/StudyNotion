import React, { useState } from "react";
import formatDuration from "../../../utils/Formatduration";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";

const CourseSubSection = ({ course, totalNoOfLectures, collapse }) => {
  const [desc, setDesc] = useState(null);
  const [subDesc, setSubDesc] = useState(null);

  const handleSubSection = (id) => {
    setDesc((prev) => (prev === id ? null : id));
  };

  const handleSubSectionDesc = (id) => {
    setSubDesc((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div>
        {course?.courseContent?.map((section, id) => (
          <div
            key={id}
            className={`w-[370px] md:w-[792px] ${
              desc === id ? " h-fit" : "h-16"
            } bg-richBlack-700 border border-richBlack-600`}
          >
            <div className="m-3 flex justify-between items-center">
              <div className="flex items-center justify-center">
                <button onClick={() => handleSubSection(id)}>
                  {desc === id ? (
                    <RiArrowDropDownLine className="h-10 w-10" />
                  ) : (
                    <RiArrowDropUpLine className="h-10 w-10" />
                  )}
                </button>
                <p>{section?.sectionName}</p>
              </div>
              <div className="flex gap-5">
                <p className="text-yellow-50">{totalNoOfLectures} lectures</p>
                <p>10 min</p>
              </div>
            </div>
            {desc === id && (
              <div className="bg-richBlack-900 py-5">
                {section?.subSection.map((sub, index) => (
                  <div key={index}>
                    <div>
                      <div className="flex justify-between items-center pb-2 pl-10 pr-5">
                        <div className="flex items-center justify-center">
                          <FaVideo className="mr-2" />
                          <p>{sub?.title}</p>
                          <button onClick={() => handleSubSectionDesc(index)}>
                            {subDesc === index ? (
                              <RiArrowDropDownLine className="h-5 w-5" />
                            ) : (
                              <RiArrowDropUpLine className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <div>
                          <p>{formatDuration(sub?.timeDuration)}</p>
                        </div>
                      </div>
                      {subDesc === index && (
                        <div className="pl-16 text-sm mb-2 text-[#C5C7D4]">
                          {sub?.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSubSection;
