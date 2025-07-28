const { categoryModel } = require("../../models/categoryModel");
const { faqModel } = require("../../models/faqModel");
const { productModel } = require("../../models/productModel");
const { sliderModel } = require("../../models/sliderModel");
const { testimonialModel } = require("../../models/testimonialModel");

let sliderData = async (req, res) => {

    try {

        let data = await sliderModel.find();
        console.log("data", data)

        let obj = {

            msg: "slider view",
            staticPath: process.env.SLIDERIMAGEPATH,
            data
        }

        res.send(obj)
        console.log("suc", obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("suc", obj)
    }
}

let getproductBtType = async (req, res) => {

    let { type } = req.params;
    console.log("productType", type);
    try {
        let data = await productModel.find({ productType: type })
            .populate('parentCategory', 'categoryName')
            .populate('subCategory', 'subcategoryName')
            .populate('subSubCategory', 'sub_subcatName')
            .populate('productColor', 'colorName')
            .populate('productMeterial', 'materialName')

        let obj;
        obj = {
            status: 1,
            msg: "product find",
            data,
            staticPath: process.env.PRODUCTIMAGEPATH,
        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }

}

let getBestSellingProduct = async (req, res) => {
    try {
        /*  let data= await productModel.find({productbestSelling: true}); */
        let data = await productModel.find({ productbestSelling: true })
            .populate('parentCategory', 'categoryName')
            .populate('subCategory', 'subcategoryName')
            .populate('subSubCategory', 'sub_subcatName')
            .populate('productColor', 'colorName')
            .populate('productMeterial', 'materialName')

        let obj;
        obj = {
            status: 1,
            msg: "BestSellingProduct find",
            data,
            staticPath: process.env.PRODUCTIMAGEPATH,
        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}
let getsingleProduct = async (req, res) => {
    let { slug } = req.params
    let data = await productModel.findOne({ slug: slug })
        .populate('parentCategory', 'categoryName')
        .populate('subCategory', 'subcategoryName')
        .populate('subSubCategory', 'sub_subcatName')
        .populate('productColor', 'colorName')
        .populate('productMeterial', 'materialName')
    let obj = {
        status: 1,
        msg: "Product Single Data",
        staticPath: process.env.PRODUCTIMAGEPATH,
        data

    }
    res.send(obj)
}
let getUpSellingProduct = async (req, res) => {
    try {
        /*  let data= await productModel.find({productbestSelling: true}); */
        let data = await productModel.find({ productUpsell: true })
            .populate('parentCategory', 'categoryName')
            .populate('subCategory', 'subcategoryName')
            .populate('subSubCategory', 'sub_subcatName')
            .populate('productColor', 'colorName')
            .populate('productMeterial', 'materialName')

        let obj;
        obj = {
            status: 1,
            msg: "Up Selling product find",
            data,
            staticPath: process.env.PRODUCTIMAGEPATH,
        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}
let getTopRatedProduct = async (req, res) => {
    try {

        let data = await productModel.find({ productTopRated: true }).limit(2)
            .populate('parentCategory', 'categoryName')
            .populate('subCategory', 'subcategoryName')
            .populate('subSubCategory', 'sub_subcatName')
            .populate('productColor', 'colorName')
            .populate('productMeterial', 'materialName')

        let obj;
        obj = {
            status: 1,
            msg: "Top Rated Product find",
            data,
            staticPath: process.env.PRODUCTIMAGEPATH,
        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}

let getFaq = async (req, res) => {
    try {

        let data = await faqModel.find({ faqStatus: true });


        let obj;
        obj = {
            status: 1,
            msg: "Faq find",
            data,

        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}

let getTestimonials = async (req, res) => {
    try {

        let data = await testimonialModel.find({ status: true });


        let obj;
        obj = {
            status: 1,
            msg: "testimonial find",
            data,
            staticPath: process.env.TESTIMONIALIMAGEPATH,

        }

        res.send(obj);
        console.log("suc", obj);
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}
let megaMenu = async (req, res) => {
   /*  let categoryData = await categoryModel.find({}, 'categoryName slug')
        .populate({
            path: 'subcategories',
            select:'subcategoryName slug',
            populate: { path: 'sub_subcategories', select: 'sub_subcatName slug'}
        }); */

          let categoryData = await categoryModel.find().select(['categoryName','slug'])
        .populate({
            path: 'subcategories',
            select:(["subcategoryName"]),
            populate: { path: 'sub_subcategories' , select:(["sub_subcatName","slug"]) }
        });
    let resObj = {
        status: 1,
        categoryData
    }
console.log("megamenu response",resObj);
    res.send(resObj)
}

module.exports = { megaMenu, getTestimonials, getFaq, getTopRatedProduct, getUpSellingProduct, getsingleProduct, getBestSellingProduct, sliderData, getproductBtType }