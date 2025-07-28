let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let sub_subcategorySchema = new mongoose.Schema({
    sub_subcatName: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 50,
        lowercase: true

    },                                                             //68349b674839b8e8f61e41f1                 
    parentCategory: { type: mongoose.Types.ObjectId, ref: "category" }, //68374556e568bbcaa6ba031b
    subCategory: { type: mongoose.Types.ObjectId, ref: "subcategory" },
    sub_subcatImage: String,
    sub_subcatOrder: Number,
    sub_subcatstatus: Boolean,
    slug: String
})

sub_subcategorySchema.pre('save', function (next) {
    this.slug = slugify(this.sub_subcatName, { lower: true });
    next();
});

let sub_subcategoryModel = mongoose.model("sub_subcategory", sub_subcategorySchema)
module.exports = { sub_subcategoryModel }
