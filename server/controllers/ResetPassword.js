const Users=require("../models/Users")
const mailSender =require("../utils/mailSender")

exports.resetPasswordToken= async(req,res)=>{
    try {
         //get email from req.body
    const {email}=req.body;
    //check user for this email, email validation
    const userExist=await Users.findOne({email});
    if(!userExist){
        return res.status(401).json({
            success:false,
            message:"email is not registered",
        })
    }
    //generate token
    const token= crypto.randomUUID();

    //update user by adding token and exoiration time
    const updateDetails= await Users.findOneAndUpdate({email:email},
                                                  {
                                                    token:token,
                                                    resetPasswordExpires:Date.now()+5*60*1000,
                                                  },
                                                  {new:true});
    // create url
    const url= `http://localhost{token}`
    //sem=nd mail containing the url
    await mailSender(email,"password reset Link",
    `password reset Link: ${url}`);
    //return response
    return res.json({
        success:true,
        message:`email sent successfully. please check email and change password`;
    })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"something went wrong while sending email"
        })
    }
   

   
}
//reset password
exports.resetPassword=()=>{
        try {
            //fetch data
            const {password, confirmPassword, token}=req.body;
            //validation
            if(password!==confirmPassword){
                return res.json({
                    success:false,
                    message:"passwords are not matching",
                })
            }
            //get user details from dbusing token
            const userDetails= await User.findOne({token:token});
            //if no entry- invalid token
            if(!userDetails){
                returnres.json({
                    success:false,
                    message:"token is ivalid",
                })
            }

            //token time check
            if(userDetails.resetPasswordExpires<Date.now()){
                return res.json({
                    success:false,
                    message:"time out",
                })
            }
            //hash password
            const hashedpassword= await bcrypt.hash(password,10);
            //password update
            await User.findOneAndUpdate(
                {token:token},
                {password:hashedpassword},
                {new:true},
            );
            //return response
            return res.status(200).json({
                success:true,
                message:"password reset successfully",
            })
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"something went wrong while resetting password",
            })
        }
}