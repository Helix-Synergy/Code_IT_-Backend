const dropdownOptions = require("../models/dropdownoptions.js");
const ServiceDropdown = require("../Models/servicedropdown.js");
const razorpayInstance = require("../config/razorpay.js");
const sendMail = require("../utilies/sendMail.js");
const crypto = require("crypto");
// Get dropdown categories + subcategories
exports.getDropdownOptions = (req, res) => {
  try {
    res.status(200).json(dropdownOptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save selected dropdown + amount
exports.saveServiceSelection = async (req, res) => {
  try {
    const { name, email, message, category, subCategory, amount } = req.body;

    if (!name || !email || !message || !category || !subCategory || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1️⃣ Create Razorpay Order
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // 2️⃣ Save order details in DB
    const serviceData = new ServiceDropdown({
      name,
      email,
      message,
      category,
      subCategory,
      amount,
      razorpay: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: "created",
      },
    });

    await serviceData.save();

    // 3️⃣ Send data to frontend
    res.status(201).json({
      success: true,
      message: "Order created & saved in DB",
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verifying payment and updating the record
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const record = await ServiceDropdown.findOne({
      "razorpay.orderId": orderId,
    });

    if (!record) {
      return res.status(404).json({ message: "Order not found" });
    }

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    record.razorpay.paymentId = paymentId;
    record.razorpay.signature = signature;
    record.razorpay.status = "paid";

    await record.save();

    // 📧 SEND CONFIRMATION EMAIL
    await sendMail({
      to: record.email,
      subject: "Payment Successful – CodeIT Consulting",
      html: `
        <h2>Payment Successful 🎉</h2>
        <p>Hi <b>${record.name}</b>,</p>

        <p>Thank you for your payment. Your transaction was successful.</p>

        <h4>Payment Details:</h4>
        <ul>
          <li><b>Service:</b> ${record.category} - ${record.subCategory}</li>
          <li><b>Amount:</b> ₹${record.amount}</li>
          <li><b>Payment ID:</b> ${paymentId}</li>
        </ul>

        <p>Our team will contact you shortly.</p>

        <p>Regards,<br/>CodeIT Consulting</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and email sent successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payments (for admin)
exports.getAllPayments = async (req, res) => {
  try {
    // Fetch all payment records from the database
    const payments = await ServiceDropdown.find().sort({ createdAt: -1 });

    // Check if there are any payments
    if (!payments || payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payment records found",
      });
    }

    // Return payments to frontend
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment records",
      error: error.message,
    });
  }
};

