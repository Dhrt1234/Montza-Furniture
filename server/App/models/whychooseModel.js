let mongoose = require("mongoose")
let whychooseSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 20,
        lowercase: true
    },
    userImage: String,
    order: Number,
    description: String,
    whychooseStatus: Boolean
})
let whychooseModel = mongoose.model("whychoose", whychooseSchema)
console.log(whychooseModel)
module.exports = { whychooseModel }