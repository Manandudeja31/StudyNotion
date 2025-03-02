/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { signUp } from "../services/operations/authAPI";
const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div className="text-white flex items-center justify-center mt-[150px]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="lg:max-w-md">
          <h1 className=" text-[30px] font-semibold pb-3">Verify Email</h1>
          <p className=" text-[18px] pb-5 text-richBlack-400">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="aspect-square w-[40px] rounded-[0.5rem] border-0 bg-richBlack-800 
                                text-center text-richBlack-5 focus:border-0 focus:outline-2 focus:outline-yellow-50 lg:w-[60px]"
                />
              )}
            />
            <button
              type="submit"
              className=" bg-yellow-50 text-center text-black w-full rounded-lg p-2 mt-5"
            >
              Verify Email
            </button>
          </form>

          <div className="flex justify-between">
            <div className=" text-[18px] text-richBlack-5 pt-2">
              <Link to="/login">
                <p>← Back to Login</p>
              </Link>
            </div>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className=" text-[18px] text-blue-100 pt-2"
            >
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
