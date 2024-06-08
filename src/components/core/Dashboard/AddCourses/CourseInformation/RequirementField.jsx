import React, { useState } from "react";
import { useEffect } from "react";
const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            // validate: (value) => value.length > 0
        })
    },[]) 

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);   

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList); 
    }
    return(
        <div className="flex flex-col items-start gap-2">
            <label className="text-richBlack-5">
                {label} <span className="text-lg text-pink-200">*</span>
            </label>

            <input
                type="text"
                name={name}
                id={"requirementField"}
                value={requirement}
                placeholder={"Enter Course Requirements..."}
                onChange={(e) => setRequirement(e.target.value)}
                className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
            />

            <button
                type="button"
                onClick={() => handleAddRequirement(requirement)}
                className="font-semibold text-yellow-50"
            >
                ADD
            </button>
            {/* Requirement List */}
            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className="flex flex-row text-richBlack-5 items-center">
                                    <span>{requirement}</span>
                                    <button
                                    type="button"
                                    onClick={handleRemoveRequirement}
                                    className="text-xs text-pure-greys-300">
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {errors[name]?.type === "required" && (
                <span role="alert" className="text-yellow-50">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementField;