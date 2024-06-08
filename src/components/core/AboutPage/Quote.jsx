import React from "react";
import HighlightText from "../Homepage/HighlightText";
const Quote = () => {
    return(
        <div className=" col-span-3 pl-10 pr-10 mb-20 text-center text-2xl font-semibold text-richBlack-100 md:text-4xl">
            "We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighlightText text={" combines technology"}/>, 
            <span className="bg-gradient-to-t from-[#FF512F] to-[#F09819] bg-clip-text text-transparent"> 
                expertise
            </span>, 
            and community to create an{" "}
            <span className="bg-gradient-to-t from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent"> 
                unparalleled educational experience."
            </span>
        </div>
    )
}

export default Quote;