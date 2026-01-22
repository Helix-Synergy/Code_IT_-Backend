const mongoose = require("mongoose");
// Consultation Schema
const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  phone: { type: String, required: true },
  ChooseOurService: {
    type: String,
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX Development",
      "Digital Marketing",
      "IT Consulting",
      "Cloud Services",
    ],
  },

  message: { type: String, required: true },
},{ timestamps: true });

// Consulation Model
module.exports = mongoose.model("Consultation", ConsultationSchema);
