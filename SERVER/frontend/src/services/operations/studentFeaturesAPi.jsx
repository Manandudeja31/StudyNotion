/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(courses, userDetails, navigate, dispatch) {
  // const toastId = toast.loading("Loading");
  const str = localStorage.getItem("token");
  let token = str.replace(/['"]/g, "");
  try {
    // load the script
    console.log("Load script");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }
    console.log("initiate order");

    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log("creating options");

    // options
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.currency,
      amount: orderResponse.data.amount.toString(),
      order_id: orderResponse.data.orderId,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails?.firstName}`,
        email: userDetails?.email,
      },
      handler: function (response) {
        // send successful wala mail
        sendPaymentSuccessEmail(response, orderResponse.data.amount, token);
        // verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops payment failed");
      console.log(error);
    });
  } catch (err) {
    console.log(`Payment failed due to: ${err.message}`);
    console.log("Payment Error.");
  }
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    console.log("Payment success Email error", err);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful, you are added to the course.");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (err) {
    console.log("Payment verify error", err);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
}
