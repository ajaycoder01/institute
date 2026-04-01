require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const contactRoutes = require("./routes/contactRoutes");

require("./models/db")
const app = express();

app.use(cors());
app.use(express.json());

// Rate limiter for OTP
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: "Too many OTP requests. Try again later." },
});

app.use("/api/contact/request-otp", otpLimiter);
app.use("/api/contact", contactRoutes);

app.get('/',(req,res)=>{
  return res.send("welocome")
})



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
