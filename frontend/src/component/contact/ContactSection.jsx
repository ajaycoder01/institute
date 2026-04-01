import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";
import BranchMap from "./BranchMap";
import OTPInput from "./OTPInput";
import "react-toastify/dist/ReactToastify.css";

export default function ContactSection() {
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState("");


  const courses = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "UI UX" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Python Programming" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Step 1: request OTP
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/contact/request-otp", {
        email: data.email,
      });

      toast.success("OTP sent to your email!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });

      setFormData(data);
      setOtpModalOpen(true); // open OTP modal
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  // Step 2: verify OTP & submit full form
  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Enter 6-digit OTP", { autoClose: 2000 });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact/submit", {
        ...formData,
        otp,
      });

      toast.success("Message Sent Successfully!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      reset();
      setOtp("");
      setOtpModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid OTP", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  // Auto-submit when OTP length is 6
  // useEffect(() => {
  //   if (otp.length === 6) handleVerifyOtp();
  // }, [otp]);


  return (
    <>
      <section className="py-16 bg-gray-50">
        {/* Heading */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            CONTACT US
          </h2>
          <div className="w-28 h-1 bg-red-900 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 font-semibold text-base sm:text-lg leading-relaxed max-w-5xl mx-auto">
            Start Your Computer Learning Journey Today. Join the Computer
            Course at{" "}
            <strong className="text-red-900">
              St. Francis Computer Institute
            </strong>{" "}
            and build essential digital skills for your future.
          </p>
        </div>

        <div className="p-3 md:p-10 grid lg:grid-cols-2 gap-8">
          {/* MAP */}
          <BranchMap />

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900 uppercase">
              Send us a Message
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <input
                  placeholder="First Name"
                  className="border border-gray-300 p-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <input
                  placeholder="Last Name"
                  className="border border-gray-300 p-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border border-gray-300 p-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="border border-gray-300 p-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  {...register("phone", {
                    required: "Mobile number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10 digit number" },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Course */}
            <div className="mt-4">
              <select
                className="border border-gray-300 px-3 py-2 md:p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                {...register("course", { required: "Please select a course" })}
              >
                <option value="" hidden>
                  Select Course...
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="mt-4">
              <textarea
                rows={4}
                placeholder="Your Message"
                className="border border-gray-300 p-2 md:p-3 rounded-lg w-full resize-none focus:ring-2 focus:ring-blue-500"
                {...register("message", { required: "Message cannot be empty" })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-blue-950 text-white p-2 md:p-3 rounded-xl hover:bg-blue-900 transition text-lg font-medium shadow-md cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>


      {/* OTP Modal */}

      <Modal
        isOpen={otpModalOpen}
        onRequestClose={() => setOtpModalOpen(false)}
        ariaHideApp={false}
        style={customModalStyles}
      >
        <div className="bg-white p-5 sm:p-8">
          {/* X Button */}
          <button onClick={() => setOtpModalOpen(false)} className="absolute top-4 right-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">Enter OTP</h2>
            <div className="w-10 h-1 bg-blue-900 mx-auto mt-1 mb-6 rounded-full"></div>

            {/* Container to hold OTP inputs */}
            <div className="w-full flex justify-center overflow-hidden mb-4">
              <OTPInput length={6} onChange={(val) => setOtp(val)} />
            </div>

            <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-tight">
              Enter the 6-digit OTP sent to your email.
            </p>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-950 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all uppercase tracking-wide text-sm"
            >
              Verify & Send
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />
    </>
  );
}

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px' // Mobile par edges se gap ke liye
  },
  content: {
    position: 'relative',
    inset: 'auto',
    width: '100%',
    maxWidth: '380px', // Thoda narrow taaki inputs compact lagein
    borderRadius: '20px',
    padding: '0',
    border: 'none',
    overflow: 'hidden'
  },
};