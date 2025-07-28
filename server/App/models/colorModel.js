let mongoose=require("mongoose")
let colorSchema=new mongoose.Schema({

colorName:{
    type:String,
    required:true,
    minLength:2,
    maxLength:20,
    unique:true,
},
colorCode:String,
colorOrder:Number,
colorStatus:Boolean
})

let colorModel=mongoose.model("color",colorSchema) // --here color is table name and colorSchema is schema of color table.
module.exports={colorModel}