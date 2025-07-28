let mongoose = require("mongoose")
let faqSchema= new mongoose.Schema({
    faqQue:{
        type:String,
        required:true,
        minLength:10,
        maxLength:1000,
        unique:true,
    },
    faqAns:{
        type:String,
        required:true,
        minLength:10,
        maxLength:200,
    },
    faqOrder:Number,
    faqStatus:Boolean
})
let faqModel=mongoose.model("faq", faqSchema)
module.exports={faqModel}