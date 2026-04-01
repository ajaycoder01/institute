// controllers/otpController.js

const Otp = require("../models/Otp");
const { sendOTP, sendContactMail } = require("../utils/mailer");

// Step 1: Request OTP
exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Email check
    if (!email) return res.status(400).json({ message: "Email required" });

    //OTP generate karna (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Purana OTP delete kar do
    await Otp.findOneAndDelete({ email });

    // Naya OTP save karo
    await Otp.create({ email, otp });

    //  OTP email bhejo
    await sendOTP(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Step 2: Verify OTP & submit form
exports.verifyAndSubmit = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, course, message, otp } = req.body;

    // OTP check
    if (!otp) return res.status(400).json({ message: "OTP required" });

    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid or expired OTP" });

    // OTP delete karo pehle
    // Ye step important hai! Agar request 2 baar aayi, doosri baar fail ho jayegi
    await Otp.deleteOne({ email });

    //  Contact mail bhejo
    await sendContactMail({ firstName, lastName, email, phone, course, message });

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
};