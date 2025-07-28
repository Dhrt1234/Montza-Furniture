let mongoose= require("mongoose")
let sliderSchema= new mongoose.Schema({

    title:{
        type:String,
        unique:true,
        required:true,
        minLength:2,
        lowercase:true
},
sliderImage:String,
sliderOrder:Number,
sliderStatus:Boolean

})

let sliderModel=mongoose.model("slider", sliderSchema)
console.log(sliderModel)
module.exports={sliderModel}