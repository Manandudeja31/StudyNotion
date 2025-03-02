import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { CountryCode } from "../../data/countrycode";
import { contactusEndpoint } from "../../services/apis.js";
import toast from "react-hot-toast";
const { CONTACT_US_API } = contactusEndpoint;
const ContactUsForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging data", data);
    try {
      setLoading(true);
      const response = await apiConnector("POST", CONTACT_US_API, data);
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success(
        "Thanks for contacting Study Notion.",
        "Our team will contact you soon."
      );
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        contactNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 text-white justify-center items-center">
        <div className="flex flex-col md:flex-row gap-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              {...register("firstName", { required: true })}
              className=" rounded-md p-2 bg-richBlack-800 w-[300px] md:w-[190px]"
            />
            {errors.firstName && <span>Please enter your name</span>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              {...register("lastName")}
              className=" rounded-md p-2 bg-richBlack-800 w-[300px] md:w-[190px]"
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            {...register("email", { required: true })}
            className=" rounded-md p-2 bg-richBlack-800 w-[300px] md:w-[400px]"
          />
          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* Phone No. */}
        <div className="flex flex-col">
          <label htmlFor="phonenumber">Phone Number</label>
          <div className="flex flex-row gap-2">
            {/* dropdown */}
            <div className=" flex flex-col gap-2 w-[69px]">
              <select
                name="dropdown"
                id="dropdown"
                className="rounded-md p-2 bg-richBlack-800"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code}-{element.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className=" flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                className=" rounded-md p-2 bg-richBlack-800 w-[225px] md:w-[325px]"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone " },
                })}
              />
            </div>
            {errors.contactNumber && (
              <span>{errors.contactNumber.message}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="3"
            placeholder="Enter Your Message Here"
            className=" rounded-md p-2 bg-richBlack-800 w-[300px] md:w-[400px]"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please Enter Your Message.</span>}
        </div>

        {/* Button */}
        <button
          type="submit"
          className=" rounded-md bg-yellow-50 text-center px-6 
          text-[16px] w-[300px] md:w-[400px] font-semibold text-black pt-2 pb-2"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
