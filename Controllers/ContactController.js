const FormMessage = require("../Models/ContactForm");
async function Contact(req,res){
    try {
       const {name,email,message}=req.body;
       if(!name|| !email|| !message) {
        return res.status(400).json({message:"All fields are required"})
       }
       else{
        const formMessage=new FormMessage({
            name,
            email,
            message
        });
        await formMessage.save();
        return res.status(200).json({message:"Message sent successfully",formMessage})
       }
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }


}
module.exports = Contact;