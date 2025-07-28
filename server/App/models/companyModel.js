let mongoose= require("mongoose")
let companySchema= new mongoose.Schema({
    companyEmail:{
        type:String,
        unique:true,
        required:true,
        minLength:2,
        maxLength:50
    },
    companyName:String,
    companyAddress:String,
    comapnyPhone:Number,
    companyLogo:String,
    companyLink:String
})

let companyModel=mongoose.model("company",companySchema)
console.log(companyModel)
module.exports={companyModel}