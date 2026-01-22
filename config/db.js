const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function ConnectionDB() {
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI)
    if(connection){
        console.log("✅ MongoDB Connected Successfully");
    }
    else{
        console.log("❌ MongoDB Connection Failed");
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
}
module.exports=ConnectionDB
