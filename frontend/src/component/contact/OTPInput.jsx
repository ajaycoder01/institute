import { useState, useRef } from "react";

export default function OTPInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // only allow numbers

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // move to next input if value entered
    if (val && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

return (
  <div className="flex gap-1.5 sm:gap-3 justify-center w-full px-2">
    {Array(length)
      .fill(0)
      .map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          inputMode="numeric" // Mobile keyboard par sirf numbers dikhayega
          value={otp[i]}
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleBackspace(e, i)}
          className="border border-gray-300 rounded-md 
                     w-[13%] max-w-[45px] h-10 sm:h-12 
                     text-center text-lg font-semibold
                     focus:ring-2 focus:ring-blue-500 outline-none 
                     transition-all shadow-sm bg-white"
        />
      ))}
  </div>
);
}