/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { LuClock8 } from "react-icons/lu";
import { FaMobileScreen } from "react-icons/fa6";
import { LuMousePointer } from "react-icons/lu";
import { TbCertificate2 } from "react-icons/tb";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Cart from "../Dashboard/Cart";
import toast from "react-hot-toast";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from "../../../slices/cartSlice";
import { buyCourse } from "../../../services/operations/studentFeaturesAPi";

const CourseDetailsCard = ({
  course,
  token,
  user,
  courseId,
  navigate,
  dispatch,
}) => {
  // console.log(token);
  const { cart } = useSelector((state) => state.cart);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleBuyCourse = () => {
    if (token) {
      buyCourse([courseId], user, navigate, dispatch);
      return;
    } else {
      navigate("/login");
    }
  };
  const handleAddToCart = () => {
    if (token) {
      const isAlreadyInCart = cart.some((item) => item._id === course._id);
      if (isAlreadyInCart) {
        toast.error("This course is already in your cart.");
        return;
      }
      dispatch(addToCart(course));
      console.log(course);
      return;
    }

    if (user && user?.accountType !== ACCOUNT_TYPE.STUDENT) {
      toast.error("You are not a student. You cannot buy a course.");
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please Login to add to cart",
      btnText: "Login",
      btn2Text: "Cancel",
      btnHandler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleCourse = () => {
    navigate("/dashboard/enrolled-courses");
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(location.href);
    toast.success("Course link copied to clipboard.");
  };
  return (
    <div>
      <div className="">
        <img
          src={course?.thumbnail}
          alt="thumbnail"
          className="h-[200px] hidden lg:block"
        />
        <div className="bg-richBlack-800 lg:bg-richBlack-700">
          <p className="p-5 text-center lg:text-left text-3xl max-[1023px]:border-t-2 border-richBlack-200 font-semibold">
            Rs. {course?.price}
          </p>
          <div className="flex flex-col justify-center gap-3 max-[1023px]:border-b-2 border-richBlack-200 items-center">
            <button
              onClick={
                user && course?.studentsEnrolled.includes(user._id)
                  ? handleCourse
                  : handleBuyCourse
              }
              className={` ${
                course?.studentsEnrolled.includes(user._id)
                  ? "bg-yellow-50 text-black font-bold rounded-lg px-28 py-2"
                  : "bg-richBlack-900 text-richBlack-5 font-semibold rounded-lg px-32 py-2"
              } `}
            >
              {user && course?.studentsEnrolled.includes(user._id)
                ? "Go to Course"
                : "Buy Now"}
            </button>
            {user && course?.studentsEnrolled.includes(user._id) ? (
              <div></div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-yellow-50 text-black rounded-lg font-semibold px-[118px] py-2 mb-8 lg:mb-0"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="hidden lg:block">
            <p className="text-richBlack-50 p-3 text-center">
              30-Day Money-Back Guarantee
            </p>
            <p className="flex px-6 ">This course includes:</p>
            <p className="flex items-center px-4 gap-2 text-[#06D6A0]">
              <LuClock8 />8 hours on-demand video
            </p>
            <p className="flex items-center px-4 gap-2 text-[#06D6A0]">
              <LuMousePointer />
              Full Lifetime access
            </p>
            <p className="flex items-center px-4 gap-2 text-[#06D6A0]">
              <FaMobileScreen />
              Access on Mobile and TV
            </p>
            <p className="flex items-center px-4 gap-2 text-[#06D6A0]">
              <TbCertificate2 />
              Certificate of completion
            </p>
          </div>
          <div className="text-yellow-50 p-5 flex items-center justify-center gap-1">
            <FaShareSquare />
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetailsCard;
