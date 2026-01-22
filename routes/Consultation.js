const express = require("express");
const router2 = express.Router();
const {
  consultationForm,
  SubmitEmail,
  GetConsultationDetails,
  GetAllEmails
} = require("../Controllers/consultationController");

// Consultation Form Route
router2.post("/consultationForm", consultationForm);
// Consultation Get Form Details
router2.get("/getalldetails",GetConsultationDetails);
// News Letter Email Route
router2.post("/submitEmail", SubmitEmail);
router2.get("/emaildetails", GetAllEmails);
module.exports = router2;
