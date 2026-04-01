import { HiPhone } from "react-icons/hi";
import { motion } from "framer-motion";

export default function CallButton() {
  const phoneNumber = "+918080880014"; // replace with your number

  return (
    <div className="fixed bottom-22 md:bottom-26  right-6 md:right-8 z-50">
      {/* Ring animation */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 1.2 }}
        className="absolute inset-0 rounded-full bg-green-400 opacity-30"
      />

      <a
        href={`tel:${phoneNumber}`}
        className="relative bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-xl flex items-center justify-center cursor-pointer"
      >
        {/* Vibration animation */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 5, -5, 0] }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 0.8 }}
        >
          <HiPhone size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </motion.div>
      </a>
    </div>
  );
}