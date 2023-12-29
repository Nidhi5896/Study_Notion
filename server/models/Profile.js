const mongoose= require("mongoose");
const profileSchema= new mongoose.Schema({
        gender:{
            type:String,
            required:true,
        },
        date_of_birth:{
            type:Date,
            required:true,
        },
        about:{
            type:String,
            required:true,
            trum:true,
        },
        contactNumber:{
            type:Number,
            trim:true,
        }


});
module.exports=mongoose.model(Profile,profileSchema);