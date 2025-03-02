import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import {Link} from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);

    const {password, confirmPassoword} = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassoword, token, navigate));
    }
    
    return (
        <div className="grid min-h-[calc(100vh-3.51rem)] place-items-center bg-richBlack-900">
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className="flex max-w-[31.5rem] flex-col gap-3 p-4 md:p-8 text-richBlack-5">
                        <h1 className=" text-[30px] font-semibold pb-3">
                            Choose new Password
                        </h1>
                        <p className=" text-[18px] pb-5 text-richBlack-400">
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={handleOnSubmit}>

                            <label className="relative">
                                <p>New password <sup className=" text-pink-200">*</sup></p>
                                <input 
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="Passowrd"
                                    className=" bg-richBlack-800 text-richBlack-5 p-3 w-full rounded-md mb-7"

                                />
                                <span onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                    {
                                        showPassword
                                        ? <AiFillEyeInvisible fontSize={25}/>
                                        : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <label className="relative">
                                <p>Confirm password <sup className=" text-pink-200">*</sup></p>
                                <input 
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassoword'
                                    value={confirmPassoword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm Password"
                                    className=" bg-richBlack-800 text-richBlack-5 p-3 w-full rounded-md mb-7"
                                />
                                <span 
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[80%] z-[10] cursor-pointer " 
                                >
                                    {
                                        showConfirmPassword
                                        ? <AiFillEyeInvisible fontSize={24}/>
                                        : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <button type='submit'
                            className=" bg-yellow-50 text-center text-black w-full rounded-lg p-2">
                                Reset Password
                            </button>
                        </form>
                        <div className=" text-[18px] text-richBlack-5 pt-2">
                            <Link to="/login">
                                    <p>← Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;