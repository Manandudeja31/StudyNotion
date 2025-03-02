import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const ChangePass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleChangePassword = async (data) => {
    try {
      dispatch(changePassword(token, data));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div
          className="flex flex-col rounded-xl  max-w-3xl p-6 gap-5 border
                border-richBlack-700 bg-richBlack-800 "
        >
          <p className="text-md ">Password</p>
          {/* Password */}
          <div className="md:flex md:flex-row flex-col gap-5">
            <div className="flex flex-col ">
              <label htmlFor="currentPass" className="text-sm">
                Current Password
              </label>
              <div className="flex relative">
                <input
                  type={showOldPass ? "text" : "password"}
                  placeholder={"Enter Current Password"}
                  id="currentPass"
                  {...register("oldPassword")}
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowOldPass(!showOldPass)}
                >
                  {showOldPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <div className="flex flex-col pt-5 md:pt-0">
              <label htmlFor="newPass" className="text-sm">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  placeholder={"Enter New Password"}
                  id="newPass"
                  {...register("newPassword")}
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowNewPass(!showNewPass)}
                >
                  {showNewPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:justify-center md:items-center">
            <label htmlFor="newPass" className="text-sm">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder={"Confirm New Password"}
                id="confirmNewPassword"
                {...register("confirmNewPassword")}
                className="bg-richBlack-600 rounded-md p-2 w-[250px]"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          {/* Password Save */}
          <div className="flex justify-end items-center max-w-3xl mt-5">
            <div className="flex gap-5">
              <button
                onClick={() => navigate("/dashboard/my-profile")}
                className="flex w-fit items-center justify-center gap-2 rounded-lg
                      bg-richBlack-800 px-2 py-2 font-semibold  sm:px-5"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
