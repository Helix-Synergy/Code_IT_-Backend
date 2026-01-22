const EmailSubmissionSchema = require("../Models/NewsLetterEmail.js");
const Consultation = require("../Models/consultationForm.js");
// Consultation Form Controller
const consultationForm = async (req, res) => {
  try {
    const { name, email, phone, ChooseOurService, message } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !phone || !ChooseOurService || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Create new consultation document
    const consultation = new Consultation({
      name,
      email,
      phone,
      ChooseOurService,
      message,
    });

    // 3️⃣ Save to database
    await consultation.save();

    // 4️⃣ Success response
    res.status(201).json({
      success: true,
      message: "Consultation form submitted successfully",
      data: consultation,
    });
  } catch (error) {
    console.error("Consultation Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
// Get All Consultation Details Controller
async function GetConsultationDetails(req, res) {
  try {
    // Fetch all consultation records from DB
    const consultations = await Consultation.find().sort({ createdAt: -1 });

    // If no records found
    if (!consultations || consultations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No consultation records found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations,
    });
  } catch (error) {
    console.error("GetConsultationDetails Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}
// News Letter News Letter Email Controller post

async function SubmitEmail(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    } else {
      const newEmail = new EmailSubmissionSchema({ email });
      await newEmail.save();
      res
        .status(201)
        .json({
          success: true,
          message: "Email submitted successfully",
          data: newEmail,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server Error. Please try again later.",
      });
  }
}
// News Letter Get All Emails Controller Get
async function GetAllEmails(req, res) {
  try {
    const emails = await EmailSubmissionSchema.find().sort({ createdAt: -1 });
  // If no records found
    if (!emails || emails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No email records found",
      });
    }
    res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch email submissions",
    });
  }
}
module.exports = { consultationForm, SubmitEmail,GetConsultationDetails,GetAllEmails };
