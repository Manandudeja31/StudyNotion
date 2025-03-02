/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
const Tags = ({ name, label, register, errors, setValue, getValues }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };
  return (
    <div className="flex flex-col items-start gap-2">
      {/* Requirement List */}
      {requirementList.length > 0 && (
        <ul className="flex flex-wrap">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex flex-row bg-yellow-50 text-richBlack-900
               font-semibold rounded-full m-2 p-2 items-center capitalize"
            >
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => {
                  handleRemoveRequirement(index);
                }}
                className="text-xs p-1 m-1 ml-2 flex font-bold text-richBlack-900 rounded-full items-center"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <label className="text-richBlack-5">
        {label} <sup className="text-lg text-pink-200">*</sup>
      </label>

      <input
        type="text"
        name={name}
        id={"requirementField"}
        value={requirement}
        placeholder={"Enter Course Requirements..."}
        onChange={(e) => setRequirement(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddRequirement(requirement);
          }
        }}
        className="self-stretch rounded-[0.5rem] bg-richBlack-700 p-[12px] text-richBlack-5 shadow-inputShadow"
      />

      {errors[name]?.type === "required" && (
        <span role="alert" className="text-yellow-50">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Tags;
