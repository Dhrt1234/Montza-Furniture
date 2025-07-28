const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")
let fs = require("fs")

let parentCategory = async (req, res) => {
    let data = await categoryModel.find().select("categoryName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
    console.log(obj);
}

let subCategory = async (req, res) => {
    let { parentid } = req.params; ///68374556e568bbcaa6ba031b
    let data = await subcategoryModel.find({ parentCategory: parentid }).select("subcategoryName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
}
let sub_subCategory = async (req, res) => {
    let { subcatid } = req.params; ///68374556e568bbcaa6ba031b
    let data = await sub_subcategoryModel.find({ subCategory: subcatid }).select("sub_subcatName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
    console.log(data)
}

let getColor = async (req, res) => {
    let data = await colorModel.find({ colorStatus: true }).select("colorName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
}
let getMeterial = async (req, res) => {
    let data = await materialModel.find({ materialStatus: true }).select("materialName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
}

let productInsert = async (req, res) => {

    let obj = { ...req.body }

    obj['productStatus'] = true;

    if (req.files) {
         console.log("gallaery", req.files.productGallery)
        if (req.files.productImage) {
            obj['productImage'] = req.files.productImage[0].filename //'1749921370810-1.jpg'
        }

        if (req.files.productBackimage) {
            obj['productBackimage'] = req.files.productBackimage[0].filename //'1749921370817-1.jpg'
        }
        if (req.files.productGallery) {
           
            obj['productGallery'] = req.files.productGallery.map((items) => items.filename)
            //[ "1749921370822-1.jpg","1749921370825-2.jpg"]
        }


    }

    let product = await productModel.insertOne(obj)
    //console.log(obj)
    obj = {
        status: 1,
        msg: "Product Saved successfully!!",
        product
    }
    res.send(obj)
    console.log("product :: ", product)




}
let getProducts = async (req, res) => {
    let data = await productModel.find()
        .populate('parentCategory', 'categoryName')
        .populate('subCategory', 'subcategoryName')
        .populate('subSubCategory', 'sub_subcatName')
        .populate('productColor', 'colorName')
        .populate('productMeterial', 'materialName')
    let obj = {
        status: 1,
        staticPath: process.env.PRODUCTIMAGEPATH,
        data

    }
    res.send(obj)
}
let getsingleProduct = async (req, res) => {
    let { id } = req.params
    let data = await productModel.findOne({ _id: id })
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
let productDelete = async (req, res) => {

    let { ids } = req.body
    let obj;
    try {
        let productImageList = await productModel.find({ _id: ids }).
            select(["productImage", "productBackimage", "productGallery"])

        "productImageList", productImageList

        for (let i of productImageList) {
            console.log("for loop")
            let deletePath = "uploads/product/" + i.productImage
            fs.unlinkSync(deletePath)

            let backImagePath = "uploads/product/" + i.productBackimage;
            fs.unlinkSync(backImagePath)

            for (let galleryItems of i.productGallery) {
                let galleryDeletePath = "uploads/product/" + galleryItems
                fs.unlinkSync(galleryDeletePath)
            }
        }

        let data = await productModel.deleteMany({ _id: ids })
        console.log(data)
        obj = {
            status: 1,
            msg: "Product is deleted successfully!!"
        }

        res.send(obj)
        console.log(obj)

    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Product does not delete."
        }
        console.log(error)
        res.send(obj)
        console.log(obj)
    }
}
let changeStatus = async (req, res) => {
    let { ids } = req.body;
    let allproducts = await productModel.find({ _id: ids }).select('productStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    console.log(allproducts)
    for (let items of allproducts) {
        await productModel.updateOne({ _id: items._id }, { $set: { productStatus: !items.productStatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)
    console.log(obj)

}

let productEdit = async (req, res) => {
    let { id } = req.params
    console.log("update method", id)
    let updatedRes = { ...req.body }
    let obj

    if (req.files) {
        if (req.files.productImage) {
            updatedRes['productImage'] = req.files.productImage[0].filename
        }
        if (req.files.productBackimage) {
            updatedRes['productBackimage'] = req.files.productBackimage[0].filename
        }
        if (req.files.productGallery) {
            updatedRes['productGallery'] = req.files.productGallery.map((value) => value.filename)
        }
    }
    console.log("product update data", updatedRes)
    try {
        console.log("images");
        let imagesView = await productModel.find({ _id: id }).select("productImage productBackimage productGallery")
        console.log("imageview", imagesView)

        for (let v of imagesView) {
            let deletePath_1 = "uploads/product/" + v.productImage
            let deletePath_2 = "uploads/product/" + v.productBackimage

            for (let v2 of v.productGallery) {
               
                let deletePath_3 = "uploads/product/" + v2
                console.log("d3",deletePath_3)
               console.log("delete image3", fs.unlinkSync(deletePath_3))
            }
            console.log("d1",deletePath_1)
            console.log("d2",deletePath_2)

           console.log("delete image1", fs.unlinkSync(deletePath_1))
            console.log("delete image2", fs.unlinkSync(deletePath_2))
        }
         let data = await productModel.updateOne({ _id: id }, { $set: updatedRes }) 

        obj = {
            status: 1,
            msg: "Product is  Updated successfully!!",
            data
           
        }
         console.log(data)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Product Already Exsists",
            error
        }
        console.log("error", error);
    }
    res.send(obj)

}

module.exports = { productEdit, changeStatus, getsingleProduct, getProducts, productInsert, productDelete, parentCategory, subCategory, sub_subCategory, getColor, getMeterial }