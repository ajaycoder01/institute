import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CareerGuidanceModal from "./CareerGuidanceForm";

export default function CTASection({ scrollToContact }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="w-full bg-blue-950 py-13 px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* LEFT CONTENT */}
          <div className="lg:w-[60%] text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Start Your <span className="text-red-500">Career Journey</span> Today
            </h2>

            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              Join{" "}
              <strong className="text-red-400">
                St. Francis Computer Institute
              </strong>{" "}
              to gain practical computer skills and hands-on training.
              Enroll now and get personalized placement guidance to kickstart
              your successful career in the digital world.
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                setTimeout(() => {
                  scrollToContact();
                }, 300);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-medium transition hover:scale-105 shadow-md cursor-pointer"
            >
              Enroll Now
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-950 hover:bg-blue-950 hover:text-white px-8 py-3 rounded-full font-medium transition hover:scale-105 shadow-md cursor-pointer hover:border hover:border-white "
            >
              Get Guidance
            </button>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <CareerGuidanceModal close={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}