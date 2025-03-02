import React from "react";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import { IoMdChatbubbles } from "react-icons/io";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-10 items-center md:items-start m-10">
      <div
        className=" flex flex-col gap-10 bg-richBlack-800 w-[350px] p-10 
      rounded-xl shadow-[-2px_-2px_20px_0px] shadow-blue-50"
      >
        <div className="flex flex-col text-white">
          <div className="flex gap-2 items-center">
            <IoMdChatbubbles />
            <h2>Chat on us</h2>
          </div>
          <div className="text-sm pl-6 text-pure-greys-100">
            <p>Our friendly team is heare to help.</p>
            <p> @mail address</p>
          </div>
        </div>
        <div className="flex flex-col text-white">
          <div className="flex gap-2 items-center">
            <HiBuildingOffice2 />
            <h2>Visit us</h2>
          </div>
          <div className="text-sm pl-6 text-pure-greys-100">
            <p>Come and say hello at our office HQ.</p>
            <p> Here is the location/address</p>
          </div>
        </div>
        <div className="flex flex-col text-white">
          <div className="flex gap-2 items-center">
            <IoCall />
            <h2>Call us</h2>
          </div>
          <div className="text-sm pl-6 text-pure-greys-100">
            <p>Monday to Friday from 8am to 5pm.</p>
            <p> +123 456 789</p>
          </div>
        </div>
      </div>
      <div
        className="text-white w-[350px]  md:w-[500px] p-10 border 
      border-pure-greys-500 rounded-xl shadow-[-2px_-2px_20px_0px] shadow-blue-50"
      >
        <h1 className="font-bold text-[30px] text-center">Get in Touch</h1>
        <p className=" text-center text-richBlack-200 pb-5">
          We'd love to hear from you, Please fill out this form.
        </p>
        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
