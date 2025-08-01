let mongoose=require("mongoose")
let adminSchema= new mongoose.Schema({
    adminEmail:{
        type:String,
        unique:true,
        required:true,
        minLength:2,
        maxLength:50,
       
    },
    adminPassword:String,
    adminName: String,
    adminPhone: Number,
    adminImage: String
    
})

let adminModel=mongoose.model("admin",adminSchema)
module.exports={adminModel}
