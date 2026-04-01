import React from "react";
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-blue-950 text-white text-sm block">

      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col flex-row items-center justify-between gap-2">

        {/* Left Section */}
        <div className="flex flex-col flex-row items-center gap-3 sm:gap-6">

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-200 text-[11px] md:text-sm" />
            <a
              href="mailto:info.webtech9886@gmail.com?subject=Inquiry&body=Hello, I want to know more about your institute."
              className="text-[11px] md:text-sm text-white hover:underline"
            >
              info.webtech9886@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-200 text-[11px] md:text-sm" />
            <a
              href="tel:+918080880014"
              className="text-[11px] md:text-sm text-white hover:underline"
            >
              +91 8080880014
            </a>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:block hidden">

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-gray-200 text-[11px] md:text-sm">

            <FaInstagram className="cursor-pointer hover:text-white transition" />
            <FaFacebookF className="cursor-pointer hover:text-white transition" />
            <FaTwitter className="cursor-pointer hover:text-white transition" />

          </div>
        </div>

      </div>

    </div>
  );
};

export default Header;