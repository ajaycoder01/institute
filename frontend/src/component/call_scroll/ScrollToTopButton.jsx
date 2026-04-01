
import { FaRocket } from "react-icons/fa"; 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Variants for entrance/exit animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 100 }, // start below the screen
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 1.2 }}
            onClick={scrollToTop}
            className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 md:p-3 rounded-full shadow-xl cursor-pointer flex items-center justify-center"
          >

            <FaRocket size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}