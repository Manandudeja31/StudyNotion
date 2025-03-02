import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customSlasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`flex w-fit items-center justify-center gap-2 rounded-lg bg-yellow-50
       px-2 py-2 font-semibold text-black sm:px-5 `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
