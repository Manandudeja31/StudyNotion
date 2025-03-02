import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div
      className="z-[1000] bg-opacity-10 fixed overflow-hidden inset-48 flex flex-col items-center 
    justify-center backdrop-blur-sm"
    >
      <div
        className="flex flex-col w-11/12 items-center justify-center max-w-[350px] rounded-lg border
       border-richBlack-400 bg-richBlack-800 p-6"
      >
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-2 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>
        <div className="flex items-center gap-x-4 pt-3">
          <IconBtn onclick={modalData?.btnHandler} text={modalData?.btnText} />
          <button
            className="cursor-pointer rounded-md bg-richBlack-200 py-[8px] px-[20px] font-semibold text-richBlack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
