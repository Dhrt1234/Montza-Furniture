let mongoose=require("mongoose")
let countrySchema=new mongoose.Schema({

countryName:{
    type:String,
    required:true,
    minLength:2,
    maxLength:50,
    unique:true,
},

countryOrder:Number,
countryStatus:Boolean
})

let countryModel=mongoose.model("country",countrySchema) // --here country is table name and countrySchema is schema of country table.
module.exports={countryModel} 