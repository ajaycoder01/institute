

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CareerGuidanceModal = ({ close }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbywJmzfkmgKznPPtM6bQuxN5LzV6_Y9JyYHvop3l1erQ7zknj8bKlZfTSw2waNyKZ6HWg/exec"; // replace with your URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
      query: e.target.query.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.query) {
      toast.error("Please fill all fields!", { autoClose: 2500 });
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });

      // Pehle toast show karo
      toast.success("Request Submitted Successfully!");

      // Fir modal close karo
      setTimeout(() => {
        close();
      }, 300);

    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };





  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-[95%] max-w-[450px] bg-[#F0F7FF] rounded-2xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-full transition-all z-10"
          >
            <FaTimes size={18} />
          </button>

          <div className="px-5 py-2 md:p-7">
            <div className="mb-4">
              <h2 className="text-lg md:text-xl font-extrabold text-gray-800 leading-tight">
                Get Career Guidance
              </h2>
              <div className="h-1 w-10 bg-red-800 mt-1 rounded-full"></div>
              <p className="text-blue-600 text-[10px] md:text-[11px] font-semibold uppercase tracking-wide mt-2">
                Connect with our experts
              </p>
            </div>

            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] md:text-[11px] font-bold text-gray-500 uppercase mb-1 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-blue-100 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none bg-white transition-all shadow-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] md:text-[11px] font-bold text-gray-500 uppercase mb-1 ml-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email ID"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-blue-100 focus:border-red-600 outline-none bg-white shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-[11px] font-bold text-gray-500 uppercase mb-1 ml-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone No."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-blue-100 focus:border-red-600 outline-none bg-white shadow-sm"
                   maxLength={10}
                   minLength={10}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] md:text-[11px] font-bold text-gray-500 uppercase mb-1 ml-1">
                  How can we help?
                </label>
                <textarea
                  name="query"
                  rows="2"
                  placeholder="Ask your question here..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-blue-100 focus:border-red-600 outline-none bg-white resize-none shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6a0707] text-white text-xs md:text-sm font-bold py-3 rounded-xl hover:bg-black hover:shadow-lg transition-all mt-2 active:scale-95 uppercase tracking-widest"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>

            <p className="text-center text-[9px] text-gray-400 mt-4">
              Your data is safe with us. By submitting, you agree to our privacy policy.
            </p>
          </div>
        </motion.div>
      </div>


    </>
  );
};

export default CareerGuidanceModal;
