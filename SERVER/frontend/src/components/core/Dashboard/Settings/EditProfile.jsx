/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import IconBtn from "../../../common/IconBtn";
import { TbUpload } from "react-icons/tb";
import { CountryCode } from "../../../../data/countrycode";
import { useDispatch } from "react-redux";
import {
  deleteProfile,
  updateDisplayPicture,
  updateProfile,
} from "../../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";
import ChangePass from "./ChangePass";
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const [newPass, setNewPass] = useState("");
  const [pass, setPass] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // console.log(file);
      previewFile(file);
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("displayPicture", selectedFile);
      dispatch(updateDisplayPicture(token, formData));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  useEffect(() => {
    if (selectedFile) {
      previewFile(selectedFile);
    }
  }, [selectedFile]);

  const handleInfoSave = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="m-10 ">
      {/* Heading & Back */}
      <button
        className="flex items-center px-3 gap-x-1 text-richBlack-300 text-sm"
        onClick={() => navigate(-1)}
      >
        <BiChevronLeft />
        Back
      </button>
      <h1 className="mt-3 text-3xl text-richBlack-5 px-3">Edit Profile</h1>
      {/* Setting Cards */}
      <div className="mt-10 flex flex-col gap-5 justify-center items-center">
        {/* Section 1 */}
        <div className=" flex rounded-xl items-center max-w-3xl p-5 gap-5 border border-richBlack-700 bg-richBlack-800 ">
          {/* Image */}
          <img
            className=" h-[56px] w-[56px] rounded-full aspect-square object-cover"
            src={
              user.image
                ? user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`
            }
            alt="User Img"
          />
          {/* Select Image */}
          <div className="flex flex-col gap-2 md:pr-[230px]">
            <p className="text-sm text-richBlack-5">Change Profile Picture</p>
            <div className="flex gap-5">
              <label
                htmlFor="img"
                className="flex w-fit items-center justify-center gap-2 rounded-lg
                   bg-richBlack-700 px-2 py-2 font-semibold text-richBlack-5 sm:px-5 cursor-pointer"
              >
                Select
              </label>
              <input
                type="file"
                id="img"
                className=" hidden"
                onChange={handleFileSelect}
              />
              <button
                className="flex w-fit items-center justify-center gap-2 rounded-lg bg-yellow-50
                  px-2 py-2 font-semibold text-black sm:px-5 cursor-pointer"
                onClick={handleImageUpload}
              >
                Upload
                <TbUpload className="font-bold" />
              </button>
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <form onSubmit={handleSubmit(handleInfoSave)}>
          <div
            className=" flex flex-col rounded-xl max-w-3xl gap-5 border
            border-richBlack-700 bg-richBlack-800 p-6"
          >
            <p className="text-md ">Profile Information</p>
            {/* Name */}
            <div className="md:flex md:flex-row flex-col gap-5">
              <div className="flex flex-col ">
                <label htmlFor="Firstname" className="text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.firstName}
                  {...register("firstName")}
                  id="Firstname"
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="Lastname" className="text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.lastName}
                  {...register("lastName")}
                  id="Lastname"
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
              </div>
            </div>
            {/* Dob & Gender */}
            <div className="md:flex md:flex-row flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="Dob" className=" text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  placeholder={"dd/mm/yyyy"}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                  {...register("dateOfBirth")}
                  id="Dob"
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
              </div>
              <div className="flex flex-col ">
                <label className="" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                  defaultValue={user?.additionalDetails?.gender}
                  {...register("gender")}
                >
                  <option defaultValue={""}>Prefer Not To Say</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            {/* Contact & About */}
            <div className="md:flex md:flex-row flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="Contact">
                  Contact Number
                </label>
                <div className="flex gap-3">
                  {/* Dropdown */}
                  <select className="bg-richBlack-600 rounded-md p-2 w-[70px]">
                    {CountryCode.map((element, index) => {
                      return (
                        <option key={index}>
                          {element.code}-{element.country}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="number"
                    placeholder={"123 4567 890"}
                    id="Contact"
                    defaultValue={user?.additionalDetails?.contactNumber}
                    {...register("contactNumber")}
                    className="bg-richBlack-600 rounded-md p-2 w-[170px]"
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="about" className="text-sm">
                  About
                </label>
                <input
                  type="text"
                  placeholder={"Enter Bio Details"}
                  id="about"
                  defaultValue={user?.additionalDetails?.about}
                  {...register("about")}
                  className="bg-richBlack-600 rounded-md p-2 w-[250px]"
                />
              </div>
            </div>
            {/* Information Save */}
            <div className="flex justify-end max-w-3xl mt-5">
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
        {/* Section 3 */}
        <div>
          <ChangePass />
        </div>
      </div>
      {/* Delete Account */}
      <div className="flex justify-center items-center mt-10 ">
        <button
          className=" flex text-left rounded-xl max-w-3xl p-5 gap-5 border
           border-pink-400 bg-pink-800"
          onClick={handleDelete}
        >
          <div className="bg-pink-400 h-10 w-10 rounded-full flex justify-center items-center aspect-square object-cover">
            <RiDeleteBin6Line />
          </div>
          <div>
            <p className="text-md">Delete Account</p>
            <p className="text-sm">Would you like to delete account?</p>
            <p className="text-sm ">
              This account conatains Paid Courses.Deleting your account will
              remove all
            </p>
            <p className="text-sm">the content associated with it.</p>
            <p className=" text-pink-200 text-md">
              I want to delete my account.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
