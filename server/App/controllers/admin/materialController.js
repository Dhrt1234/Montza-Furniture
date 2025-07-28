const { materialModel } = require("../../models/materialModel");

let materialInsert = async (req, res) => {
    let { materialName, materialOrder } = req.body
    let obj;
    let materialStatus = true
    try {

        let insertObj = {
            materialName,
            materialOrder,
            materialStatus
        }
        let materialRes = await materialModel.insertOne(insertObj)
        obj = {
            status: 1,
            msg: "Materiallll inserted successfully!!",
            materialRes
        }
        res.send(obj)


    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }


}

let materialView = async (req, res) => {

    let {currentPage,limit} = req.query;
    
    let searchobj = {


    }
    console.log("matname", req.query.materialName)
    console.log("matorder", req.query.materialOrder)

    if (req.query.materialName != "") {
        //searchobj['materialName']= {$regex:req.query.materialName, $options: "i"} through moongoose
        searchobj['materialName'] = new RegExp(req.query.materialName, "i") //through RegExp function
    }

    if (req.query.materialOrder != "") {
        searchobj['materialOrder'] = Number(req.query.materialOrder)
        console.log("searchobj", searchobj['materialOrder'])
    }

   
    try {

        let finalSkip=(currentPage-1)*limit;

        let data = await materialModel.find(searchobj).skip(finalSkip).limit(limit);
        
        let allData = await materialModel.find(searchobj);
        
        let obj = {
            status: 1,
            totalData: allData.length,
            pages: Math.ceil(allData.length/limit),
            msg: "materials display",
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
        console.log("error", obj)
    }

}
let materialDelete = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let delRes = await materialModel.deleteOne({ _id: id })

        obj = {
            status: 1,
            msg: "material delete from table",
            delRes
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }
}
let materialMultiDelete = async (req, res) => {
    let { ids } = req.body;
    console.log(ids);
    let obj;
    try {

        let delMultiRes = await materialModel.deleteMany({ _id: ids })
        obj = {
            status: 1,
            msg: "multiple materials are deleted!!",
            delMultiRes
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }
}

let materialUpdate = async (req, res) => {
    let { id } = req.params;
    let { materialName, materialOrder } = req.body
    let obj;
    try {
        let updateObj =
        {
            materialName,
            materialOrder

        }

        let updateRes = await materialModel.updateOne({ _id: id }, { $set: updateObj })

        obj = {
            status: 1,
            msg: "materialsterial  is updated successfully!!",
            updateRes
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }
}

let singleMaterialView = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let data = await materialModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "material view ",
            data
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            error
        }
        res.send(obj)
    }
}

let changeStatus = async (req, res) => {
    let { ids } = req.body;
    let allMaterials = await materialModel.find({ _id: ids }).select('materialStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for (let items of allMaterials) {
        await materialModel.updateOne({ _id: items._id }, { $set: { materialStatus: !items.materialStatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)

}


module.exports = { materialInsert, materialView, materialDelete, materialMultiDelete, materialUpdate, singleMaterialView, changeStatus }