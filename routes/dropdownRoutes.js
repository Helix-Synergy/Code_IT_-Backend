const express = require("express");
const router = express.Router();
const {
  getDropdownOptions,
  saveServiceSelection,
  getAllPayments
} = require("../controllers/dropdownController");
const { verifyPayment } = require("../controllers/dropdownController");
// Routes
router.get("/options", getDropdownOptions);
router.post("/save", saveServiceSelection);
router.get("/payments",getAllPayments)
router.post("/verify-payment", verifyPayment)

module.exports = router;
