import Footer from "./Footer";
import { CheckCircle, Briefcase } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import CallButton from "./call_scroll/CallButton";
import ScrollToTopButton from "./call_scroll/ScrollToTopButton";


export default function CoursesPage({ selectedCourse, closeCoursePage, scrollToContact }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!selectedCourse) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-32 md:pt-33 lg:pt-36 pb-8 px-4">

        {/* HERO SECTION */}
        <motion.div
          className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-2 lg:p-3 grid xl:grid-cols-2  gap-10 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          {/* LEFT */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-6 lg:w-8xl xl:max-w-5xl">
            {/* Course Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {selectedCourse.title}
            </h1>

            {/* Course Description */}
            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
              {selectedCourse.description}
            </p>

            {/* Learning Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {selectedCourse.topics.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base md:text-lg">
                  <CheckCircle className="text-green-600" size={18} />
                  {item}
                </div>
              ))}
            </div>

            {/* Duration */}
            <div className="mb-6 text-gray-600 text-sm sm:text-base">
              Duration:
              {/* {selectedCourse.duration} */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  closeCoursePage();
                  setTimeout(() => {
                    scrollToContact();
                  }, 300);
                }}
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-lg cursor-pointer text-sm sm:text-base md:text-lg transition"
              >
                Enroll Now
              </button>

              <button className="w-full sm:w-auto border px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 text-sm sm:text-base md:text-lg transition">
                Download Syllabus
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <motion.div
            className="flex justify-center  w-full md:px-7 hidden xl:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={selectedCourse.img}
              alt="course"
              className="
                  object-cover 
                  rounded-xl
                "
            />
          </motion.div>

        </motion.div>

        {/* SECOND SECTION */}
        <motion.div
          className="max-w-7xl mx-auto mt-10 grid md:grid-cols-2 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >

          {/* WHAT YOU'LL LEARN */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <ul className="space-y-4">
              {selectedCourse.topics.map((topic, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <CheckCircle className="text-blue-500 mt-1" size={18} />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* CAREER */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Career Opportunities</h2>
            <div className="space-y-4">
              {selectedCourse.career.map((job, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <Briefcase className="text-blue-600" size={18} />
                  {job}
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>

      <Footer />

      <CallButton />
      <ScrollToTopButton />
    </>
  );
}