import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsApi";
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import IconBtn from "../../../../common/IconBtn"
import RequirementField from "./RequirementField"
import {setStep, setCourse} from "../../../../../slices/courseSlice"
import { toast } from "react-hot-toast";
import {COURSE_STATUS} from "../../../../../utils/constants"
export default function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)
    const {course, editCourse} = useSelector((state) => state.course);
    const[loading, setLoading] = useState(false)
    const[courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    function isFormUpdated() {
        const currentValues = getValues();
        return (
          currentValues.courseTitle !== course.courseName ||
          currentValues.courseDescription !== course.courseDescription ||
          currentValues.price !== course.price ||
          // currentValues.courseTags.toString() !== course.tag.toString() ||
          currentValues.category._id !== course.category._id ||
          currentValues.courseRequirements !== course.instructions ||
          // currentValues.thumbnail !== course.thumbnail ||
          currentValues.courseBenefits !== course.whatYouWillLearn
        );
      }

    const onSubmit = async(data) => {

        if(editCourse){
           if(isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();
            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName", data.courseTitle);
            }
            if(currentValues.courseShortDesc !== course.courseDescription){
                formData.append("courseDescription", data.courseShortDesc);
            }      
            if(currentValues.coursePrice !== course.price){
                formData.append("price", data.coursePrice);
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn){
                formData.append("whatYouWillLearn", data.courseBenefits);
            }
            if(currentValues.courseCategory._id !== course.course.category._id){
                formData.append("category", data.courseCategory);
            } 
            
            if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                formData.append("instructions", data.courseRequirements);
            }
            setLoading(true);
            const result = await editCourseDetails(
            { formData, courseId: course._id, token});
            setLoading(false);
            if (result) {
                setStep(2);
                dispatch(setCourse(result));
            }
           }
           else{
            toast.error("No changes made so far");
           }
        }

        //create a new course
        console.log("creating course");
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        // formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        console.log(`result : ${formData}`)
        // formData.append("thumbnail", data.thumbnail);
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        console.log(`result is: ${formData}`)
        if (result) {

            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    }
    return(
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richBlack-700 bg-richBlack-800 p-6 space-y-8 w-[480px] ml-10"
        >
            <div>
                <label htmlFor="courseTitle">Course Title<sup className=" text-pink-500">*</sup></label>
                <input 
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", {required:true})}
                    className="w-full"
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is Required</span>
                    )
                }
            </div>
            <div>
                <label htmlFor="courseShortDesc">Course Description<sup className=" text-pink-500">*</sup></label>
                <textarea 
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", {required:true})}
                    className="w-full min-h-[140px]"
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Description is Required</span>
                    )
                }
            </div>
            <div className="relative">
                <label htmlFor="coursePrice">Course Price<sup className=" text-pink-500">*</sup></label>
                <input 
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    {...register("coursePrice", {
                        required:true,
                        valueAsNumber: true
                    })}
                    className="w-full"
                />
                <HiOutlineCurrencyRupee className="absolute top-7 text-richBlack-900"/>
                {
                    errors.courseTitle && (
                        <span>Course Price is Required</span>
                    )
                }
            </div>
            <div>
                <label htmlFor="courseCategory">Course Category <sup className=" text-pink-500"> *</sup></label>
                <select
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory",)}
                >
                    <option value="" disabled>Choose a category</option>
                    {
                        !loading && courseCategories.map((category, index) => {
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        })
                    }
                </select>
                {
                    errors.courseCategories && (
                        <span>Course Category is Required</span>
                    )
                }
            </div>
            
            {/* Benefits of course */}
            <div>
                <label htmlFor="coursebenefits">Benefits of the course<sup className=" text-pink-500">*</sup></label>
                <textarea 
                    id="coursebenefits"
                    placeholder="Enter Benefits of the course"
                    {...register("coursebenefits", {required:true})}
                    className="w-full min-h-[140px]"
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Benefits is Required</span>
                    )
                }
            </div>

            <RequirementField 
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            
            />
            <div className="flex flex-row-reverse gap-3">
                {editCourse && (
                    <button
                        type="button"
                        onClick={() => dispatch(setStep(2))}
                        className="flex items-center gap-2 rounded-lg bg-richBlack-700 px-6 py-3 text-richBlack-5 shadow-ctaButtonShadow"
                    >
                        Continue Without Saving
                    </button>
                )}
                <IconBtn type="submit" text={!editCourse ? "Next" : "Save Changes"} />
      </div>

        </form>
    )
}