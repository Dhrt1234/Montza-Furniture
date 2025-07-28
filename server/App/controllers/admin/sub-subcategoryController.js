const { categoryModel } = require("../../models/categoryModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")
let fs = require("fs")


let sub_subcategoryInsert = async (req, res) => {

    let { sub_subcatName, sub_subcatOrder, parentCategory, subCategory } = req.body
    let obj = {
        sub_subcatName,
        sub_subcatOrder,
        parentCategory,
        subCategory,
        sub_subcatstatus: true
    }

    if (req.file) {
        if (req.file.filename) {
            obj['sub_subcatImage'] = req.file.filename
        }
    }
    try {

        let sub_subcatRes = await sub_subcategoryModel.insertOne(obj)
        obj = {
            status: 1,
            msg: "sub subcategory Saved successfully!!",
            sub_subcatRes
        }
        res.send(obj)
        console.log(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "error comes in sub sub category.",
            error
        }
        res.send(obj)
    }


}



let parentCategory = async (req, res) => {
    let data = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    let obj = {
        status: 1,
        data


    }
    res.send(obj)
}



let subCategoryData = async (req, res) => {
    let { subCategoryShow } = req.query;

    console.log("pid", subCategoryShow)


    try {

        let data = await subcategoryModel.find({ parentCategory: subCategoryShow, subcategoryStatus: true }).select("subcategoryName")
        let obj = {
            status: 1,
            msg: "SubCategory View",
            data
        }

        res.send(obj)
        console.log(data)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "error comes in single sub category view.",
            error
        }
          console.log(obj)
    }

}
let sub_subcategoryView = async (req, res) => {

    let { currentPage, limit } = req.query;
    let searchobj = {
    }
    try {


        if (req.query.parentCategory != "") {
            //searchobj['parentCategory']= {$regex:req.query.parentCategory, $options: "i"} through moongoose
            searchobj['parentCategory'] = req.query.parentCategory; //through RegExp function
            console.log("parent category", searchobj['parentCategory'])
        }

        if (req.query.subCategory != "") {
            //searchobj['subCategory']= {$regex:req.query.subCategory, $options: "i"} through moongoose
            searchobj['subCategory'] = req.query.subCategory; //through RegExp function
            console.log("subCategory ", searchobj['subCategory'])
        }

        if (req.query.sub_subcatName != "") {
            searchobj['sub_subcatName'] = new RegExp(req.query.sub_subcatName, "i")
            console.log("sub_subcatName", searchobj['sub_subcatName'])
        }

        let finalSkip = (currentPage - 1) * limit;
        let data = await sub_subcategoryModel.find(searchobj)
            .populate({
                path: "subCategory",
                populate: {
                    path: "parentCategory"
                }
            }).skip(finalSkip).limit(limit);

        let allData = await sub_subcategoryModel.find()
            .populate({
                path: "subCategory",
                populate: {
                    path: "parentCategory"
                }
            })
        let obj = {
            status: 1,
            totalData: allData.length,
            pages: Math.ceil(allData.length / limit),
            msg: "Sub SubCategory  View",
            staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
            data

        }
        res.send(obj)
        console.log("sub subcategory res", obj)
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

let changeStatus = async (req, res) => {
    let { ids } = req.body;
    let allcategories = await sub_subcategoryModel.find({ _id: ids }).select('sub_subcatstatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    console.log(allcategories)
    for (let items of allcategories) {
        await sub_subcategoryModel.updateOne({ _id: items._id }, { $set: { sub_subcatstatus: !items.sub_subcatstatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)
    console.log(obj)

}
let singleCategoryView = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let data = await sub_subcategoryModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "single subcategory2 view ",
            staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
            data
        }
        res.send(obj)
        console.log(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log(obj)
    }


}



let subSubcategoryUpdate = async (req, res) => {
    let { id } = req.params
    let obj

    let { sub_subcatName, sub_subcatOrder, parentCategory, subCategory } = req.body
    let subcategory2edit = {
        sub_subcatName,
        sub_subcatOrder,
        parentCategory,
        subCategory,

    }

    if (req.file) {
        if (req.file.filename) {
            subcategory2edit['sub_subcatImage'] = req.file.filename
        }
    }

    try {
        let subcategory2View = await sub_subcategoryModel.find({ _id: id }).select("sub_subcatImage")
        console.log(subcategory2View)

        for (let v of subcategory2View) {
            let deletePath = "uploads/sub_subcategory/" + v.sub_subcatImage
            console.log(deletePath)
            console.log("delete image", fs.unlinkSync(deletePath))
        }
        let data = await sub_subcategoryModel.updateOne({ _id: id }, { $set: subcategory2edit })
        obj = {
            status: 1,
            msg: "Sub SubCategory Updated Successfully!!",
            data
        }
        res.send(obj)
        console.log(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Enter Valid Category Records"
        }
        res.send(obj)
        console.log(obj)
    }
}

let categoryDelete = async (req, res) => {
    let { ids } = req.body
    let categoryView = await sub_subcategoryModel.find({ _id: ids }).select("sub_subcatImage")


    for (let v of categoryView) {
        let deletePath = "uploads/sub_subcategory/" + v.sub_subcatImage;
        fs.unlinkSync(deletePath)

    }

    let data = await sub_subcategoryModel.deleteMany({ _id: ids })

    let obj = {
        status: 1,
        msg: "Sub SubCategory is deleted successfully!!"
    }

    res.send(obj)
}

module.exports = { parentCategory, sub_subcategoryInsert, subCategoryData, sub_subcategoryView, changeStatus, singleCategoryView, subSubcategoryUpdate, categoryDelete }