let mongoose = require("mongoose")
let testimonialSchema= new mongoose.Schema({

name:{
    type:String,
    required:true,
    minLength:2,
    maxLength:50

},
userImage:String,
designation:{
    type:String,
    required:true
},
rating:{
    type:Number,
    required:true
},
order:Number,
message:String,
status:Boolean

})

let testimonialModel=mongoose.model("testimonial", testimonialSchema)
console.log(testimonialModel)
module.exports={testimonialModel}