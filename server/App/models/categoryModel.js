let mongoose=require("mongoose")
const {default: slugify} = require("slugify")

let categorySchema= new mongoose.Schema({

    categoryName:{
        type:String,
        unique:true,
        required:true,
        minLength:2,
        maxLength:50,
        lowercase:true
    },

    categoryImage:String,
    categoryOrder:Number,
    categoryStatus:Boolean,
    slug:String
})

categorySchema.pre('save', function (next){
    this.slug= slugify(this.categoryName, {lower: true});
    next();
}); 

// Virtual field to get all subcategories
categorySchema.virtual('subcategories', {
    ref: 'subcategory',
    localField: '_id',
    foreignField: 'parentCategory'
});


categorySchema.set('toJSON', { virtuals: true });

let categoryModel=mongoose.model("category",categorySchema)
console.log(categoryModel)
module.exports={categoryModel}