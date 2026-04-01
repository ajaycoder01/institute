const express = require("express");
const { requestOTP, verifyAndSubmit } = require("../controllers/contactController");
const router = express.Router();

router.post("/request-otp", requestOTP);
router.post("/submit", verifyAndSubmit);

module.exports = router;