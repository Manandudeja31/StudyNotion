import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";
export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="flex mx-5 md:mx-16">
        {steps.map((item) => (
          <>
            <div key={item.id}>
              <div
                key={item.id}
                className={` ${
                  step === item.id
                    ? " bg-yellow-900 border border-yellow-50 text-yellow-50 h-12 w-12 flex justify-center items-center rounded-full"
                    : ` border border-richBlack-700 ${
                        step < item.id
                          ? "bg-richBlack-800 text-richBlack-300"
                          : "bg-yellow-50 text-richBlack-900 border border-richBlack-900"
                      } h-12 w-12 flex justify-center items-center rounded-full`
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>
            {/* {Add code for dashed betewwn steps} */}
            {item.id !== steps.length && (
              <div
                className={` flex items-center h-[1px] mt-5 w-[20%] border border-dashed ${
                  step >= item.id ? "text-yellow-50" : "text-richBlack-500 "
                } `}
              ></div>
            )}
          </>
        ))}
      </div>
      <div className="grid grid-cols-4 mt-2 mb-5 gap-20 md:gap-0">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`mx-5  md:mx-6 ${
              step >= item.id ? "text-richBlack-5" : "text-richBlack-500"
            } `}
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
