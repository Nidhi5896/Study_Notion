const User= require("../models/Users");
const OTP= require("../models/OTP");
const otpGenerator=require("otp-generator");
const Profile= require("../models/Profile");
const bcrypt = require("bcrypt");


// login
exports.login=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
// register
exports.register=async(req, res)=>{
        try {
            const {firstname,lastname,email,password, confirmPassword,accountType,otp}=req.body;

            //validate
            if(!firstname|| !lastname||!email||!password||!confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"all fields are required",
                })           
            }

            //match password two password
            if(password!==confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"password and confirmpassword value doesn't matches please try again!",

                });
            }

            //check if the email is already registered
            const result= await User.findOne({email});
           
            if(result){
               return res.status(401),json({
                    success:false,
                    message:"user already registered"
                })
            }

            //find recent OTP
            const recentOTP =await OTP.find({email}).sort({createdAt:-1}).limit(1);
            console.log(recentOTP);

            //validate OTP
            if(recentOTP.length==0){
                return res.status(400).json({
                    success:false,
                    message:"OTP not found",
                })
            }
            else if(otp!==recentOTP){
                return res.status(400).json({
                    success:false,
                    message:"invalid OTP",
                })
            }


            //bcrypt hash password
            const hashedPassword=await bcrypt.hash(password,10);

            const ProfileDetails= await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null,
            })
            //inserting in db
            const user=User.create({firstname,lastname,email,password:hashedPassword,accountType,additionalDetails:ProfileDetails._id,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`});
           
            
        } catch (error) {
            
        }
}
// otp
exports.sendOTP=async(req,res) => {
    try {
        const{email}=req.body;
        //check if user already exist
        const checkUserPresent= await User.FindOne({email});

        //if user already exist then resturn a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user already registered",
        })
    }
    //generate otp
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabet:false,
        specialChars:false,
    });
    console.log(otp);
    // check inique otp or not
    const result=await OTP.findOne({otp});

    while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabet:false,
            specialChars:false,
        });
        result= await OTP.findOne({otp});
    }
    const otpPayload={email,otp};

    //create an entry
    const otpBody= await OTP.create(otpPpayload);
    console.log(otpPayload);
    // retuen response successfullr
    res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp,
    })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error,
        })
    }
    

};

//changePassword