import React, { useState } from "react";
import { FaPlus, FaRegQuestionCircle, FaDollarSign, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const faqData = {
  General: [
    {
      question: "Tortor vitae purus faucibus ornare suspendisse sed nisi lacus?",
      answer:
        "This is a smooth animated answer section. You can place detailed explanation here for general queries.",
    },
    {
      question: "Tortor dignissim convallis aenean et tortor at risus viverra?",
      answer:
        "This answer explains pricing structure, timelines, and additional service costs clearly.",
    },
    {
      question: "Venenatis urna cursus eget nunc scelerisque viverra mauris in?",
      answer:
        "Support related explanation goes here with proper structured information.",
    },
  ],
  Pricing: [
    {
      question: "How much does a typical project cost?",
      answer:
        "Pricing depends on scope and features. We provide flexible packages.",
    },
  ],
  Support: [
    {
      question: "Do you offer post-launch support?",
      answer:
        "Yes, we offer long term maintenance and support packages.",
    },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-[#0a0f1c] to-black py-24 px-4 sm:px-6 lg:px-20 overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10">

        {/* Heading */}
         <div className="relative mb-10 flex justify-center">
        
          {/* Background Big Text */}
          <span className="absolute -top-6 sm:-top-8
            text-6xl sm:text-8xl lg:text-8xl
            font-extrabold uppercase
            bg-gradient-to-r from-cyan-500 to-blue-600
            bg-clip-text text-transparent
            opacity-5 whitespace-nowrap
            pointer-events-none select-none">
            FAQ
          </span>
        
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-2xl sm:text-3xl md:text-4xl font-bold
            bg-gradient-to-r from-cyan-400 to-blue-500
            bg-clip-text text-transparent"
          >
            FAQ
          </motion.h2>
        
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-14 flex-wrap">
          {Object.keys(faqData).map((tab) => {
            const getIcon = () => {
              switch (tab) {
                case "General":
                  return <FaRegQuestionCircle />;
                case "Pricing":
                  return <FaDollarSign />;
                case "Support":
                  return <FaHeadset />;
                default:
                  return null;
              }
            };

            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-500 shadow-lg shadow-cyan-500/30"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                {getIcon()}
                {tab}
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-6 text-left">
          {faqData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full
                  bg-cyan-500/20 text-cyan-400 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-white">
                    {item.question}
                  </span>
                </div>

                <FaPlus
                  className={`transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-45 text-cyan-400"
                      : "text-gray-400 group-hover:text-cyan-400"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-16 pb-6 text-gray-400 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-r from-cyan-500/10 to-blue-600/10
        border border-cyan-500/30 rounded-3xl p-10 text-center backdrop-blur-xl">

          <p className="text-gray-300 mb-6">
            Still have questions?{" "}
            <span className="text-cyan-400 font-semibold">
              We're here to help!
            </span>
          </p>

          <button className="bg-gradient-to-r from-cyan-500 to-blue-600
          text-white px-8 py-3 rounded-full font-medium
          transition-all duration-300 hover:scale-105
          shadow-lg shadow-cyan-500/40">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}