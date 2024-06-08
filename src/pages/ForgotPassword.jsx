import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
    return(
        <div className="flex justify-center pt-20">
            <div className="text-white lg:max-w-lg ">
            {
                loading ? (
                    <div> Loading...</div>
                ) : (
                    <div>
                        <h1 className=" text-[30px] font-semibold pb-3">
                            {
                                !emailSent ? "Reset your Password" : "Check Your Email"
                            }
                        </h1>

                        <p className=" text-[18px] pb-5 text-richBlack-400">
                            {
                                !emailSent ? "Have no fear.We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                                : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address <span className=" text-pink-500">*</span></p>
                                        <input 
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email Address"
                                        className=" bg-richBlack-800 text-richBlack-5 p-3 w-full rounded-md mb-7"

                                        />
                                    </label>
                                )
                            }

                                <button 
                                type="submit"
                                className=" bg-yellow-50 text-center text-black w-full rounded-lg p-2">
                                    {
                                        !emailSent ? "Reset Password" : "Resend Email"
                                    }
                                </button>
                        </form>

                        <div className=" text-[18px] text-richBlack-500 pt-2">
                            <Link to="/login">
                                <p>← Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
        
export default ForgotPassword;
