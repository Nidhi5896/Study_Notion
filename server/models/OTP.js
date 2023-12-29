const mongoose=require("mongoose");
const mailSender =require("../utils/mailSender");

const OTPSchema= new mongoose.Schema({
         email:{
            type:String,
            required:true,
         },
         otp:{
            type:String,
            required:true,
         },
         createdAt:{
            type:Date,
            default:Date.now(),
            expires:5*60,
         }, 
});

// function to send mails
async function sendVarificationEmail(email,otp){
   try {
      const mailResponse=await mailSender(email, "varifiaction email from studyNotion", otp);
      console.log("Email sent successfully",mailResponse);
   } catch (error) {
      console.log("error occured while sending verifiacation email", error);
   }
};
OTPSchema.pre("save",async function(next){
   await sendVarificationEmail(this.email,this.otp);
   next();
})

module.exports=mongoose.model("OTP",OTPSchema);