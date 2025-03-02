import React from "react";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <>
      <div className="relative text-white">
        <div>
          <h1 className=" text-3xl ml-5 pb-5">Add Course</h1>
          <div>
            <RenderSteps />
          </div>
        </div>
        <div
          className=" absolute top-5 left-[600px] basis-[336px] hidden md:flex 
        md:flex-col w-80 rounded border border-richBlack-700 bg-richBlack-800 p-6 
        text-lg font-semibold text-richBlack-5 ml-20"
        >
          <h4 className="items flex items-center gap-2">
            {/* <BsLightningCharge className="text-yellow-50" /> */}
            Course Upload Tips:
          </h4>
          <ul className="mt-4 list-none space-y-2 pl-2 text-xs font-medium">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
            <li>Course Builder is where you create & organize a course.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
