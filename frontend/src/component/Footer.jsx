import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import logo from '../assets/sfcnewlogo.png'

const Footer = () => {

  const startYear = 2020;
  const totalYears = new Date().getFullYear() - startYear;

  return (
    <footer className="relative bg-gradient-to-t from-[#050816] via-[#0a0f1c] to-[#050816] text-white pt-8 md:pt-10 lg:pt-16 pb-8 px-6 sm:px-10 md:px-16 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo + About */}
          <div>
            <div className=" w-[250px] md:w-[250px] lg:w-[220px] xl:w-[250px]  bg-white p-2 rounded mb-2">
              <img
                src={logo}
                alt="Logo"
                className="h-22 md:h-22 lg:h-20 xl:h-23 w-auto object-contain"
              />
            </div>

            <p className="text-gray-300  text-sm leading-relaxed">
              St. Francis Computer Institute has been providing quality computer education for the past
              <span className="text-white font-semibold"> {totalYears}+ years</span> , with a strong focus on practical skills and career growth. We aim to empower students with the knowledge and confidence needed to succeed in today’s digital world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="block h-1 w-10 bg-red-700 mt-2 rounded-full"></span>
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              {["Home", "About", "Courses", "Careers", "Blog", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white transition duration-300 hover:translate-x-2 inline-block"
                  >
                    › {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative inline-block">
              Solutions
              <span className="block h-1 w-10 bg-red-700 mt-2 rounded-full"></span>
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              {["Digital Strategy", "Cloud Computing", "Data Analytics", "AI Solutions", "Cybersecurity"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white transition duration-300 hover:translate-x-2 inline-block"
                  >
                    › {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative inline-block">
              Get in Touch
              <span className="block h-1 w-10 bg-red-700 mt-2 rounded-full"></span>
            </h3>

            <ul className="space-y-5 text-gray-400 text-sm">
              {[
                { icon: <FaMapMarkerAlt />, text: "St. Francis Computer Institute | Bhayander West, Thane, Ground Floor, Cross Apt, G-1, Uttan Rd, near Big Cross, Uttan Village, Bhayander West, Mumbai, Mira Bhayandar, Maharashtra 401101", type: "text" },
                { icon: <FaPhoneAlt />, text: "+918080880014", type: "phone" },
                { icon: <FaEnvelope />, text: "info.webtech9886@gmail.com", type: "email" },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <div className="bg-black/30 p-3 rounded-full text-white hover:bg-red-500 transition">
                    {item.icon}
                  </div>

                  {item.type === "phone" ? (
                    <a
                      href={`tel:${item.text}`}
                      className="text-gray-300 hover:text-blue-400"
                    >
                      {item.text}
                    </a>
                  ) : item.type === "email" ? (
                    <a
                      href={`mailto:${item.text}?subject=Inquiry&body=Hello, I want to know more about your institute.`}
                      className="text-gray-300 hover:text-blue-400"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-gray-300">{item.text}</p>
                  )}
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  className="bg-black/30 p-3 rounded-full cursor-pointer hover:bg-red-500 transition border border-white"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row gap-3 justify-center items-center text-gray-300 text-sm text-center md:text-left">

          <p>
            © {new Date().getFullYear()} by St. Francis Computer Institute | Privacy Policy
          </p>



        </div>

      </div>
    </footer>
  );
};

export default Footer;