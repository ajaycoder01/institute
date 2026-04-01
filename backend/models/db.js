
const mongoose = require("mongoose");

// MongoDB Connection
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)  // options remove karein
  .then(() => console.log("MongoDB Connected "))
  .catch(err => {
    console.error("MongoDB CONNECTION ERROR ", err);
    process.exit(1);
  });