const mongoose= require("mongoose");
const userSchema= new mongoose.Schema({
         firstName: {
            type:String,
            requires:true,
            trim:true,
         },
         lastName: {
            type:String,
            requires:true,
            trim:true,
         },
         email:{
            type:String,
            required:true,
         },
         password:{
            type:String,
            required:true,
         },
         accountType:{
              type:String,
              enum:["student","instructor","admin"],
              required:true,
         },
         additionaDetails:{
              type:mongoose.Schema.Types.ObjectId,
              required:true,
              ref:"profile",
         },
         courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"course",
            }
         ],
         image:{
            type:String,
            required:true,
         },
         courseProgress:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"courseProgress",
         },
         token:{
            type:String,
            required:true,
         },
         


});
module.exports=mongoose.model("User",userSchema);