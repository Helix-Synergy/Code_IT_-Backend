const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
// Database Connection
const ConnectioDB = require("./config/db");
ConnectioDB();
// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const dropdownRoutes = require("./routes/dropdownroutes.js");
const paymentRoutes = require("./routes/dropdownroutes.js")
app.use("/dropdown", dropdownRoutes);
// post
app.use("/serviceselection", dropdownRoutes);
// get
app.use("/getallpayments", dropdownRoutes);

app.use("/api/payment", paymentRoutes);
// Contact Routes
const contact = require("./routes/Contactroutes");
app.use("/contact", contact);
// Consultation Routes
const consultationRoutes = require("./routes/Consultation.js");
app.use("/consultation", consultationRoutes);
app.use("/consultationDetails", consultationRoutes);
// News Letter Routes
const newsletterRoutes = require("./routes/Consultation.js");
app.use("/newsletter", newsletterRoutes);
app.use("/getemail", newsletterRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("API is working");
});
// Server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`),
);
