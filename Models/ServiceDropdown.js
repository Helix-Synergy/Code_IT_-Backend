// Payment Dropdown Schema
const mongoose = require("mongoose");
const serviceDropdownSchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
     email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },

  message:{type:String,required:true},
    category: {
      type: String,
      required: true,
      enum: ["Consulting", "Academia", "Prod-Kit"],
    },
    subCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
     razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
    status: String,
  },
  },
  { timestamps: true },
);

// Payment Dropdown Model
module.exports = mongoose.model("ServiceDropdown", serviceDropdownSchema);
