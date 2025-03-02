import React, { useEffect, useState } from "react";
import CourseSubSection from "./CourseSubSection";

const CourseContent = ({ course }) => {
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    let lectures = 0;
    course?.courseContent?.forEach((section) => {
      lectures += section?.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [course]);

  // console.log(course);
  return (
    <div>
      <div className="w-[792px] h-[620px] p-5">
        <h1 className="text-2xl font-semibold pb-2">Course Content</h1>
        <div className="flex justify-between mb-5 gap-2 text-[#C5C7D4]">
          <p className="text-sm">
            {course?.courseContent?.length} section • {totalNoOfLectures}{" "}
            lecture • {course?.timeDuration} total length
          </p>
          <button
            className="text-yellow-50"
            onClick={() => setCollapse(!collapse)}
          >
            Collapse all sections
          </button>
        </div>
        <div>
          <CourseSubSection
            course={course}
            totalNoOfLectures={totalNoOfLectures}
            collapse={collapse}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
