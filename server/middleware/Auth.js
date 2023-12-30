const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/Users");

//auth
exports.auth=async(req,res,next)=>{
    try {
        //extract token
        const token= req.cookies.token||req.body.token||req.header("Authorization").replace("brearer","");

        //if token missing
        if(!token){
          return res.status(401).json({
            success:false,
            message:"Token is missing",
          });
        }
        //verify token
        try {
            const decode=  jwt.verify(token, process.env.JWT_SECRETE);
            console.log(decode);
            req.User=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid,"
            })
        }
        next();
    } catch (err) {
        return res.status(401).json({
            success:false,
            message:"something went wrong during verificartion"
        })
    }
}
// is student
exports.isStudent= async(req,res, next)=>{
    try {
        if(req.User.accountType!=="student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student only"
            })
        }
        next();
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"user type cant be verified",
        })
    }


}
// is instructor
exports.isInstructor= async(req,res, next)=>{
    try {
        if(req.User.accountType!=="instructor"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for instructor only"
            })
        }
        next();
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"user type cant be verified",
        })
    }


}
//is Admin
exports.isAdimn= async(req,res, next)=>{
    try {
        if(req.User.accountType!=="Adimn"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for Adimn only"
            })
        }
        next();
    } catch (error) {
        return res.status(402).json({
            success:false,
            message:"user type cant be verified",
        })
    }


}