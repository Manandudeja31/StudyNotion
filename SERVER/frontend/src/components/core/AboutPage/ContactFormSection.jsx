import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";
const ContactFormSection = () => {
  return (
    <div className=" w-[350px] md:w-[500px] border p-10 rounded-xl shadow-[2px_2px_20px_0px] shadow-white">
      <h1 className="font-bold  text-[30px] text-center">Get in Touch</h1>
      <p className=" text-center text-richBlack-200 pb-10">
        We'd love to hear from you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
