import React from "react";
import BannerCarousel from "./BannerCarousel";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import brochure from '../../assets/brochure.pdf'
import { Bounce, ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const Banner = ({ openCoursePage, scrollToContact }) => {

    const handleDownload = () => {

  // toast message
  toast(
    <div className="flex items-start gap-3">
      <FaCheckCircle className="text-green-500 text-lg sm:text-xl mt-1 animate-bounce shrink-0" />

      <div>
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          Brochure Downloaded
        </p>

        <p className="text-gray-500 text-xs sm:text-sm leading-snug">
          Your file is ready to view 📄
        </p>
      </div>
    </div>,
    {
      position: "top-right",
      autoClose: 3500,
      transition: Bounce,
    }
  );

  // download trigger
  const link = document.createElement("a");
  link.href = brochure;
  link.download = "Company-Brochure.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    
    <>
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gray-50">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-70 to-red-70"></div>

      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-[350px] h-[350px] bg-red-500 opacity-20 blur-[140px] rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] bg-blue-500 opacity-20 blur-[140px] rounded-full"></div>

      {/* Light Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.045] 
      [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)] 
      [background-size:40px_40px]"></div>

      <div
        className="relative max-w-7xl mx-auto w-full
        pt-32 sm:pt-32 lg:pt-29
        px-5 sm:px-6 lg:px-8
        grid grid-cols-1 lg:grid-cols-2
        gap-12 items-center"
      >

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >

          <h1
            className="font-extrabold leading-tight
            text-gray-900
            text-[25px] sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            St. Francis

            <span className="block text-blue-900">
              Computer Institute
            </span>

            <span
              className="block mt-3
              text-red-600
              text-lg sm:text-2xl md:text-3xl"
            >
              <Typewriter
                words={[
                  "Learn • Upgrade • Succeed",
                  "Courses for Every Skill Level",
                  "Build Your Tech Career",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p
            className="mt-6 text-gray-600
            text-sm sm:text-base md:text-lg
            max-w-xl mx-auto lg:mx-0"
          >
            Enhance your abilities, grow your expertise, and build the
            skills needed to succeed. With practical training and focused
            guidance, accelerate your career and achieve your professional goals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <button
              onClick={() => {
                setTimeout(() => {
                  scrollToContact();
                }, 300);
              }}
              className="bg-red-600 hover:bg-red-700
              text-white font-semibold
              px-6 py-3 rounded-lg
              shadow-lg transition cursor-pointer"
            >
              Enroll Now
            </button>

            <button
              href={brochure}
              download="Company-Brochure.pdf"
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaDownload />
              Download Brochure
            </button>

          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <BannerCarousel openCoursePage={openCoursePage} />
        </motion.div>

      </div>

    </section>

 <ToastContainer
         position="top-right"
         autoClose={3500}
         transition={Bounce}
         toastStyle={{
           background: "#ffffff",
           color: "#111",
           borderRadius: "12px",
           boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
           padding: "14px",
         }}
       />
    </>

  );
};

export default Banner;