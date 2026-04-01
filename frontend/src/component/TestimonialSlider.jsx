import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const originalData = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    role: "CHIEF TECHNOLOGY OFFICER",
    desc: "Passionate about building scalable solutions and leading innovative development teams.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "HEAD OF PRODUCT DESIGN",
    desc: "Creative visionary who transforms complex problems into intuitive design solutions.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "David Kumar",
    role: "VP OF MARKETING",
    desc: "Growth strategist with expertise in digital marketing campaigns.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "CUSTOMER SUCCESS LEAD",
    desc: "Dedicated to ensuring every customer achieves their goals.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const data = [...originalData, ...originalData, ...originalData];

export default function TestimonialSlider() {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const [index, setIndex] = useState(originalData.length);
  const [cardWidth, setCardWidth] = useState(0);
  const [visible, setVisible] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Adjust visible cards based on window width
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 640) setVisible(1); // Mobile
      else if (width < 1024) setVisible(2); // Tablet
      else setVisible(3); // Desktop
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // Calculate card width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setCardWidth(containerRef.current.offsetWidth / visible);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [visible]);

  // Auto slide
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 3000);
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  // Infinite loop protection
  useEffect(() => {
    if (index >= data.length - visible) setIndex(originalData.length);
    if (index <= 0) setIndex(originalData.length);
  }, [index, visible]);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-white overflow-hidden text-center text-black">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-red-400/18 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/18 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Heading */}
      <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-black">
            TESTIMONIAL
          </h2>
          <div className="w-30 h-1 bg-red-900 mx-auto mt-3"></div>
        </div>

      <div
        ref={containerRef}
        className="max-w-6xl mx-auto px-4 overflow-hidden relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex"
          animate={{ x: -index * cardWidth }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {data.map((item, i) => (
            <div key={i} style={{ width: cardWidth }} className="flex-shrink-0 p-3 sm:p-4">
              <div className="group bg-white backdrop-blur-xl border border-gray-200 rounded-2xl p-6 sm:p-8 text-center transition-all duration-500 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-3">

                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full border-4 border-red-500/40 transition duration-500"
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.name}</h3>
                <p className="text-red-500 text-xs sm:text-sm font-semibold tracking-wide mb-2 sm:mb-4">{item.role}</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Arrows */}
        <div className="flex justify-center sm:justify-end gap-4 mt-6 sm:mt-10">
          <button
            onClick={() => setIndex((prev) => prev - 1)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white flex items-center justify-center hover:scale-110 transition shadow-lg shadow-red-500/30"
          >
            <IoArrowBack />
          </button>
          <button
            onClick={() => setIndex((prev) => prev + 1)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white flex items-center justify-center hover:scale-110 transition shadow-lg shadow-red-500/30"
          >
            <IoArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
}