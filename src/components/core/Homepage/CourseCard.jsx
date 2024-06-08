import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";

const CourseCard = ({cardData}, {currentCard}) => {
    
    return (
        
        <div className=''>
            {
                cardData.active ? (
                    <div className="relative mt-3 text-left text-richBlack-700 w-[100%] h-[300px] bg-white shadow-[_10px_10px_0px_0px] shadow-yellow-50">
                        <div className=" relative pb-5 border-b-2 border-dashed border-spacing-5 border-opacity-75 ml-4 mr-4">
                            <div className="font-semibold pb-2 text-richBlack-900 pt-5 text-md">
                            {cardData.heading}
                            </div>        
                            <p className=" text-sm text-richBlack-300 pb-28">
                                {cardData.description}
                            </p> 
                        </div> 
        
                        <div className="flex flex-row gap-40 text-blue-500 pl-4 pr-4 pt-5">
                            <p className="flex gap-2">
                                <BsFillPeopleFill/>
            
                                {cardData.level}
                            </p>
            
                            <p className="flex gap-2 text-blue-500">
                                <MdPlayLesson/>
                                {cardData.lessonNumber}
                            </p>
                        </div>
        
                    </div>
                ) : (
                    <div className="relative mt-3 text-left text-richBlack-700 w-[100%] h-[300px] bg-richBlack-800 ">
                        <div className=" relative pb-5 border-b-2 border-dashed border-spacing-5 border-opacity-75 ml-4 mr-4">
                            <div className="font-semibold pb-2 text-white pt-5 text-md">
                            {cardData.heading}
                            </div>        
                            <p className=" text-sm text-richBlack-300 pb-28">
                                {cardData.description}
                            </p> 
                        </div> 
        
                        <div className="flex flex-row gap-40 text-white pl-4 pr-4 pt-5">
                            <p className="flex gap-2">
                                <BsFillPeopleFill/>
            
                                {cardData.level}
                            </p>
            
                            <p className="flex gap-2">
                                <MdPlayLesson/>
                                {cardData.lessonNumber}
                            </p>
                        </div>
        
                    </div>
                )
            }
        </div>

    )
}

export default CourseCard;