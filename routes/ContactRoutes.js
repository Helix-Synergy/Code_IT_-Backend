const express = require("express");
const Contact=require("../Controllers/Contactcontroller.js");

const router1 = express.Router();
router1.post("/contactform",Contact)
module.exports = router1;