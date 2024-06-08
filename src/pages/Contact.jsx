import React from "react";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
const Contact = () => {
  return (
    <div
      className="text-white w-[350px] flex flex-col justify-center 
    items-center md:w-[800px] m-10 border border-white p-2 rounded-lg"
    >
      <h1 className="font-bold text-[30px] text-center">Get in Touch</h1>
      <p className=" text-center text-richBlack-200 pb-10 ">
        We'd love to hear from you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default Contact;
