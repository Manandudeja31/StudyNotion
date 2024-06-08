import React from "react"
import { useSelector } from "react-redux"
import {FaCheck} from 'react-icons/fa'
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
export default function RenderSteps() {
    const {step} = useSelector((state) => state.course);
    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]
    return(
        <>
            <div>
                {steps.map((item) => {
                    <>
                        <div>
                            <div className={`${step === item.id
                            ? " bg-yellow-900 border-yellow-50 text-yellow-50"
                            : " border-richBlack-700 bg-richBlack-800 text-richBlack-300"}`}>
                            {
                                step > item.id ? (<FaCheck />) : (item.id)
                            }   
                            </div>
                        </div>
                        {/* {Add code for dashed betewwn steps}
                                item.id !== steps.length 
                        */}
                    </>
                })}
            </div>
            <div>
                {steps.map((item) => {
                    <>
                        <div>
                            console.log(item.title);
                            <p>{item.title}</p>
                        </div>
                    </>
                })}
            </div>
            {step === 1 && <CourseInformationForm />}
            {/* {step === 2 && <CourseBuilderForm />} */}
            {/* {step === 3 && <PublishCourse />} */}
        </>
    )
}