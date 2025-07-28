const { productModel } = require("../../models/productModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel");
const { subcategoryModel } = require("../../models/subCategoryModel");

let mongoose = require("mongoose")
let viewCategory = async (req, res) => {
    let resObj;
    try {
        let data = await subcategoryModel
            .find()
            .select(["subcategoryName", "slug"])
            .populate({
                path: "sub_subcategories", // virtual populate
                select: ["sub_subcatName", "slug"],
            });


        resObj = {
            status: 1,
            data,
        };

        res.send(resObj);
    }
    catch (error) {
        resObj = {
            status: 0,
            error
        }
        res.send(resObj)
        console.log("error", resObj)
    }
}

let viewProducts = async (req, res) => {

    let { slug } = req.params;
    console.log("slug :-", slug);

    let subSubCategorySlug = await sub_subcategoryModel.findOne({ slug });
    console.log(subSubCategorySlug);

    let data = await productModel
        .find({ subSubCategory: subSubCategorySlug._id })
        .populate("parentCategory", "categoryName")
        .populate("subCategory", "subcategoryName")
        .populate("subSubCategory", "sub_subcatName")
        .populate("productMeterial", "materialName")
        .populate("productColor", "colorName");
    resObj = {
        status: 1,
        msg: " Product listing",
        staticPath: process.env.PRODUCTIMAGEPATH,
        data,
    };

    res.send(resObj);
}

let getProducts = async (req, res) => {
    let { categories } = req.query; // Array of ObjectId strings
    console.log("category:", categories);

    let categoryObjectIds = categories ? categories.split(",") : [];// convert into array
    console.log("categoryObjectIds", categoryObjectIds);
    /* let filter = {};

    if (categoryObjectIds.length > 0) {
        filter.subSubCategory = { $in: categoryObjectIds };
    }
    console.log("filter::", filter); */
    const data = await productModel.find({ subSubCategory: { $in: categoryObjectIds } }) //productModel.find( { subSubCategory: { $in: [ 68532252b30ece93e9db71c9, 6849d43764780270e36c55b9 ] } })//here we can get products whose subsubcategory ids match with $in:[] list documents
    //const data = await productModel.find(filter);
    console.log("product data", data);
    let obj = {
        status: 1,
        msg: "products find ",
        data,
        staticPath: process.env.PRODUCTIMAGEPATH
    }
    res.send(obj);
}

/*   let obj;
 
  try {
      let { categories } = req.query; // Array of ObjectId strings
      console.log("category:", categories);
 
      /*   if (!categories) {
            obj = {
                status: 0,
                msg: "No Category Provided "
            }
            console.log("obj", obj)
            // res.send(obj);
        }
        else { */

// If single selection, convert to array
/*  if (!Array.isArray(categories)) {
     categories = [categories];
 }
 const validIds = categories.filter(id => mongoose.isValidObjectId(id));

 if (validIds.length === 0) {
     console.log("no valid ids");
 }
 else {
     // Convert each ID string to ObjectId
     const categoryObjectIds = validIds.map(id => new mongoose.Types.ObjectId(id));

     // Query products where categoryId in provided category ObjectIds
     const data = await productModel.find({ subSubCategory: { $in: categoryObjectIds } });
     console.log(" ppppp ---data", data);
 }



 obj = {
     status: 1,
     msg: "products find ",
     data
 }
 // res.send(obj);
}

 catch (error) {
 console.error(error);
 obj = {
     status: 0,
     msg: "Error fetching in products. "
 }
  res.send(obj);
}

res.send(obj); */



module.exports = { getProducts, viewCategory, viewProducts }