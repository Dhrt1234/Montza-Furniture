const { subscribe } = require("diagnostics_channel")
const { categoryModel } = require("../../models/categoryModel")
const { sub_subcategoryModel } = require("../../models/sub-subcategoryModel")
const { subcategoryModel } = require("../../models/subCategoryModel")
let fs = require("fs")

let subcategoryInsert = async (req, res) => {

    let { subcategoryName, subcategoryOrder, parentCategory } = req.body
    let obj = {
        subcategoryName,
        subcategoryOrder,
        parentCategory,
        subcategoryStatus: true
    }

    if (req.file) {
        if (req.file.filename) {
            obj['subcategoryImage'] = req.file.filename
        }
    }
    try {

        let subcategoryRes = await subcategoryModel.insertOne(obj)
        obj = {
            status: 1,
            msg: "sub category Saved successfully!!",
            subcategoryRes
        }
        res.send(obj)

    }
    catch (error) {
        obj = {
            status: 0,
            msg: "error comes in sub category.",
            error
        }
        res.send(obj)
    }


}


let subcategoryView = async (req, res) => {
    let { currentPage, limit } = req.query;
    let searchobj = {
    }
try{

    
     if (req.query.parentCategory != "") {
        //searchobj['parentCategory']= {$regex:req.query.parentCategory, $options: "i"} through moongoose
        searchobj['parentCategory'] = req.query.parentCategory; //through RegExp function
        console.log("parent category", searchobj['parentCategory'])
    }

    if (req.query.subcategoryName != "") {
        searchobj['subcategoryName'] = new RegExp(req.query.subcategoryName, "i")
        console.log("subcategoryName", searchobj['subcategoryName'])
    }

    let finalSkip = (currentPage - 1) * limit;


    let data = await subcategoryModel.find(searchobj).populate('parentCategory', 'categoryName').skip(finalSkip).limit(limit);
    let allData = await subcategoryModel.find().populate('parentCategory', 'categoryName')
    let obj = {
        status: 1,
        totalData: allData.length,
        pages: Math.ceil(allData.length/limit),
        msg: "Sub Cat View",
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        data

    }
    res.send(obj)
     console.log("subcategory res", obj)
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

let parentCategory = async (req, res) => {
    let data = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    let obj = {
        status: 1,
        data


    }


    res.send(obj)

}


let changeStatus = async (req, res) => {
    let { ids } = req.body;
    let allcategories = await subcategoryModel.find({ _id: ids }).select('subcategoryStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for (let items of allcategories) {
        await subcategoryModel.updateOne({ _id: items._id }, { $set: { subcategoryStatus: !items.subcategoryStatus } })
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
        let data = await subcategoryModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "single category view ",
            staticPath: process.env.SUBCATEGORYIMAGEPATH,
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


let subcategoryUpdate = async (req, res) => {
    let { id } = req.params
    let obj
    let { subcategoryName, subcategoryOrder, parentCategory } = req.body



    let subcategoryedit =
    {
        subcategoryName,
        subcategoryOrder,
        parentCategory

    }

    if (req.file) {
        if (req.file.filename) {
            subcategoryedit['subcategoryImage'] = req.file.filename
        }
    }

    try {
        let subcategoryView = await subcategoryModel.find({ _id: id }).select("subcategoryImage")


        for (let v of subcategoryView) {
            let deletePath = "uploads/subcategory/" + v.subcategoryImage
            fs.unlinkSync(deletePath)
        }
        let data = await subcategoryModel.updateOne({ _id: id }, { $set: subcategoryedit })
        obj = {
            status: 1,
            msg: "SubCategory Updated Successfully!!",
            data
        }
        res.send(obj)

    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Enter Valid Category Records"
        }
        res.send(obj)

    }
}
let categoryDelete = async (req, res) => {
    let { ids } = req.body
    let obj;
    try {

        //step1: delete  sub subcategory pics
        let sub_subcatpics = await sub_subcategoryModel.find({ subCategory: ids }).select("sub_subcatImage")


        for (let v of sub_subcatpics) {
            let deletePath = "uploads/sub_subcategory/" + v.sub_subcatImage;
            fs.unlinkSync(deletePath)
        }
        //delete sub subcategory

        const sub_subcategoryDelete = await sub_subcategoryModel.deleteMany({ subCategory: ids });

        // if sub subcategory delete then delete subcategory

        if (sub_subcategoryDelete.acknowledged && sub_subcategoryDelete.deletedCount >= 0) {

            //delete first photos of subcategories
            let subcategorypics = await subcategoryModel.find({ _id: ids }).select("subcategoryImage")


            for (let v of subcategorypics) {
                let deletePath = "uploads/subcategory/" + v.subcategoryImage;
                fs.unlinkSync(deletePath)

            }

            //delete subcategories
            let subcategoryDelete = await subcategoryModel.deleteMany({ _id: ids });
            if (subcategoryDelete.deletedCount === 1) {
                obj = {
                    status: 1,
                    msg: "subCategories and subsubcategories are deleted successfully!!",
                }
                res.send(obj);
            }
            else {
                obj = {
                    status: 0,
                    msg: "SubCategory not found"
                }
                res.send(obj);
            }

        }
        else {
            obj = {
                status: 0,
                msg: "Failed to delete sub subcategories"
            }
            res.send(obj);
        }

    }

    catch (error) {

        console.log(error);
        obj = {
            status: 0,
            msg: error + " An error occurred while deleting subcategories"
        }
        res.send(obj);
    }
}



module.exports = { parentCategory, subcategoryInsert, subcategoryView, changeStatus, singleCategoryView, subcategoryUpdate, categoryDelete }