const mongoose = require("mongoose");
// News Letter Email Schema
const EmailSubmissionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
},{ timestamps: true });

// News Letter Model
module.exports = mongoose.model("EmailSubmission", EmailSubmissionSchema);
