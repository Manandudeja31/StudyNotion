import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPi";
import { useNavigate } from "react-router-dom";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these Course:", courses);
    // Todo API integrate -> TO Payment Gateway
    if (token) {
      const courses = cart.map((course) => course._id);
      buyCourse(courses, user, navigate, dispatch);
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center rounded-lg bg-richBlack-700 p-6 
    w-56 md:self-auto"
    >
      <h3 className="text-richBlack-400">Total</h3>
      <h4 className="text-2xl font-bold text-yellow-50">Rs. {total}</h4>
      <strike className="text-sm text-richBlack-300">
        Rs. {total + total * (10 / 100)}
      </strike>
      <button
        className="mt-2 flex w-fit items-center justify-center gap-2 rounded-lg bg-yellow-50
       px-2 py-2 font-semibold text-black sm:px-5"
        onClick={handleBuyCourse}
      >
        Buy Now
      </button>
    </div>
  );
}
