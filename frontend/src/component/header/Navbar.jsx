import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CareerGuidanceModal from "../CareerGuidanceForm";
import { FaUserCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";
import coursesData from "../data/coursesData"
import Header from "./Header";
import logo from "../../assets/sfcnewlogo.png"



// props ko destructure kiya
export default function Navbar({ scrollToHome, scrollToAbout, scrollToContact, scrollToService, openCoursePage, closeCoursePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [active, setActive] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(null)
  const [allCourseOpen, setAllCourseOpen] = useState(false)

  // Helper function to map names to functions
  const handleNavClick = (item) => {

    closeCoursePage(); // course page close

    setTimeout(() => {

      setActive(item);
      setMenuOpen(false);

      if (item === "Home") scrollToHome();
      if (item === "About") scrollToAbout();
      if (item === "Contact") scrollToContact();
      if (item === "Services") scrollToService();
    }, 100);
  };

  return (
    <>

      <header className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md bg-white shadow-lg shadow-blue-50">
        <Header />
        {/* Top Bar - Same as before */}
        <div className="px-5 flex items-center justify-between bg-black text-white text-xs md:text-sm">
          {/* ... Social Icons code same rahega ... */}
        </div>

        <nav className="mx-auto flex h-21 md:h-22 lg:h-26  items-center justify-between px-4 sm:px-6 lg:px-9 xl:px-15 shadow-md">
          <a className="flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="h-18 sm:h-18 md:h-19.5 lg:h-22 xl:h-23 w-auto object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6  tracking-[1px]">
            {["Home", "About", "Services"].map((item) => (
              <li key={item} className="relative ">
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-blue-950 font-semibold text-md uppercase cursor-pointer "
                >
                  {item}
                </button>
                {active === item && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-800"
                  />
                )}
              </li>
            ))}

            {/* All Courses Dropdown */}
            <li className="relative group cursor-pointer">
              <button className="text-blue-950 text-md uppercase flex items-center gap-1 font-semibold">
                All Courses <FaChevronDown size={10} />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[101]">
                {coursesData.map((course) => (
                  <div key={course.name} className="relative group/sub">
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 cursor-pointer flex justify-between items-center">
                      {course.name}
                      {course.sub.length > 0 && <FaChevronRight size={10} />}
                    </div>

                    {course.sub.length > 0 && (
                      <div className="absolute left-full top-0 w-64 bg-white shadow-xl rounded-r-md py-2 
                        opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible 
                        transition-all duration-300 max-h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-200">
                        {course.sub.map((sub) => (
                          <div
                            key={sub.title}
                            onClick={() => openCoursePage(sub)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 cursor-pointer"
                          >
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>

            {/* Contact comes last */}
            <li key="Contact" className="relative">
              <button
                onClick={() => handleNavClick("Contact")}
                className="text-blue-950 text-md uppercase cursor-pointer font-semibold"
              >
                Contact
              </button>
              {active === "Contact" && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-800"
                />
              )}
            </li>
          </ul>

          {/* Modal Button & Burger */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="hidden md:block rounded-full bg-blue-950 px-4 py-2 text-xs font-bold text-white hover:bg-red-800 transition uppercase cursor-pointer ">Get Career Guidance</button>
            <button onClick={() => setIsModalOpen(true)} className="block sm:block md:hidden  z-50 text-blue-950 text-3xl"><FaUserCircle /></button>
            <button className="h-4 w-6 lg:hidden relative z-[110]" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`absolute block h-0.5 w-full bg-blue-950 transition-all ${menuOpen ? "rotate-45 top-2" : "top-0"}`} />
              <span className={`absolute block h-0.5 w-full bg-blue-950 top-2 transition-all ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block h-0.5 w-full bg-blue-950 transition-all ${menuOpen ? "-rotate-45 top-2" : "top-4"}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>{isModalOpen && <CareerGuidanceModal close={() => setIsModalOpen(false)} />}</AnimatePresence>

      {/* Mobile Menu - Updated with handleNavClick */}
      <div
        className={`fixed inset-0 z-[90] bg-white lg:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* SCROLLABLE AREA */}
        <div className="h-full overflow-y-auto pt-34 pb-10">

          <ul className="flex flex-col gap-5 px-6 text-base uppercase font-semibold">

            {/* NAV ITEMS */}

            <li
              onClick={() => {
                handleNavClick("Home");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              HOME
            </li>

            <li
              onClick={() => {
                handleNavClick("About");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              ABOUT
            </li>

            <li
              onClick={() => {
                handleNavClick("Services");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              SERVICES
            </li>

            <li
              onClick={() => {
                handleNavClick("Contact");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              CONTACT
            </li>

            {/* ALL COURSES */}

            <li className="w-full">

              <button
                onClick={() => setAllCourseOpen(!allCourseOpen)}
                className="w-full flex justify-between items-center py-2"
              >
                ALL COURSES
                <FaChevronDown
                  className={`transition ${allCourseOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {allCourseOpen && (

                <div className="mt-3 border-t">

                  {coursesData.map((course, index) => (

                    <div key={course.name} className="border-b">

                      {/* COURSE CATEGORY */}

                      <button
                        onClick={() =>
                          setCourseOpen(courseOpen === index ? null : index)
                        }
                        className="w-full flex justify-between items-center py-3 text-gray-700"
                      >
                        {course.name}

                        {course.sub.length > 0 && (
                          <FaChevronDown
                            className={`transition ${courseOpen === index ? "rotate-180" : ""
                              }`}
                          />
                        )}
                      </button>

                      {/* SUB COURSES */}

                      {courseOpen === index && (

                        <div className="bg-gray-50">

                          {course.sub.map((sub) => (

                            <div
                              key={sub.title}
                              onClick={() => {
                                openCoursePage(sub);
                                setMenuOpen(false);
                              }}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-red-700 cursor-pointer"
                            >
                              {sub.title}
                            </div>

                          ))}

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              )}

            </li>

          </ul>

        </div>
      </div>


    </>
  );
}

