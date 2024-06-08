import { useSelector } from "react-redux";
import React from "react";
import IconBtn from "../../../common/IconBtn"

export default function RenderTotalAmount() {
    const {total, cart} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these Course:",courses);
    }
    return(
        <div className="flex flex-col self-stretch rounded-lg bg-richBlack-700 p-6 md:w-56 md:self-auto">
            <h3 className="text-richBlack-400">Total</h3>
            <h4 className="text-2xl font-bold text-yellow-50">Rs. {total}</h4>
            <strike className="text-sm text-richBlack-300">
                Rs. {total + total * (10 / 100)}
            </strike>
            <IconBtn className={"mt-2"} onClick={handleBuyCourse} text={"Buy Now"} />
        </div>
    )
}