import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({modalData}) => {
    return(
        <div>
            <div>
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div>
                    <IconBtn
                      onclick={modalData?.btnHandler}
                      text={modalData?.btnText}  
                    />
                    <button onclick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal