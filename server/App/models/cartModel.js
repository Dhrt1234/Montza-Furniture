let mongoose=require("mongoose")
let cartSchema=new mongoose.Schema({

title:{
    type:String,
},
productId:{type:mongoose.Types.ObjectId,ref:"product"},
image:String,
price:Number,
qty:Number,
color:{type: mongoose.Types.ObjectId, ref:"color"},
userId:{type: mongoose.Types.ObjectId, ref:"user"}
})

let cartModel=mongoose.model("cart",cartSchema) // --here cart is table name and cartSchema is schema of cart table.
module.exports={cartModel}