import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLightbulb, FaChartLine, FaDownload } from "react-icons/fa";
import abtImg from '../assets/about.webp'
import brochure from '../assets/brochure.pdf'
import { Bounce, ToastContainer, toast } from "react-toastify";


const featuresData = [
  {
    id: 1,
    icon: <FaCheckCircle />,
    title: "Expert Consulting",
    desc: "Strategic implementation of emerging technologies drives competitive advantage.",
  },
  {
    id: 2,
    icon: <FaLightbulb />,
    title: "Innovative Solutions",
    desc: "Cutting-edge frameworks deliver scalable solutions for complex challenges.",
  },
  {
    id: 3,
    icon: <FaChartLine />,
    title: "Growth Strategy",
    desc: "Comprehensive digital transformation for sustainable growth.",
  },
];

const startYear = 2014;
const currentYear = new Date().getFullYear();
const experience = currentYear - startYear;

const AboutSection = ({
  title = " St. Francis Computer Institute",
  subtitle = "Empowering Students with Practical, Career-Oriented Computer Education",
  features = featuresData,
}) => {
  const [downloadMsg, setDownloadMsg] = useState(false);

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
          Your file is ready to view.
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
      <section className="bg-gray-50 py-14 px-5 md:px-12">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-black">
            ABOUT US
          </h2>
          <div className="w-30 h-1 bg-red-900 mx-auto mt-3"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full group"
          >

            <div className="relative overflow-hidden rounded-2xl shadow-lg
                          h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">

              {/* SAME IMAGE HOVER ANIMATION */}
              <img
                src={abtImg}
                alt="team"
                className="w-full h-full object-cover transition-all duration-700 ease-out
                 group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 
                group-hover:opacity-100 transition duration-500"></div>

            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-4 right-4
            bg-blue-700 text-white px-4 py-3 rounded-xl shadow text-center">

              <h3 className="text-lg font-bold">{experience}+</h3>
              <p className="text-xs">Years Experience</p>

            </div>

          </motion.div>

          {/* Content Section */}
          <div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-2xl md:text-3xl text-blue-950 font-bold text-black mb-4">
              {title}
            </h1>

            <p className="text-gray-950 font-semibold mb-6">
              {subtitle}
            </p>

            {/* Features */}
            <div className="space-y-4 text-gray-600 font-semibold">

              <p>St. Francis Computer Institute is a trusted name in professional computer training and one of the leading computer institutes in Bhayander. We are dedicated to providing practical, career-oriented education that equips students with strong technical skills to thrive in today’s digital world.</p>

              <p>Our 100% hands-on approach, small batch sizes, and personalized attention ensure that every student gains real-world experience and confidence. Guided by strong values of excellence, integrity, and dedication, our mission is to deliver high-quality computer education and remain a reliable choice for students seeking the best computer classes in Bhayander to build a successful career.</p>
            </div>

            {/* Button */}
            <div className="mt-8">

              <button
                href={brochure}
                download="Company-Brochure.pdf"
                onClick={handleDownload}
                className="inline-flex items-center gap-2
                        bg-red-700 text-white
                        px-6 py-2.5 rounded-lg
                        transition-all duration-300
                        hover:bg-red-600 hover:shadow-lg cursor-pointer"
              >
                <FaDownload />
                Download Brochure
              </button>
            </div>
          </div>
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

export default AboutSection;
