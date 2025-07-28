
let mongoose=require("mongoose")
let materialSchema=new mongoose.Schema({
    materialName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
        unique:true,
    },
    materialOrder:Number,
    materialStatus:Boolean
})
let materialModel=mongoose.model("material",materialSchema)
module.exports={materialModel}