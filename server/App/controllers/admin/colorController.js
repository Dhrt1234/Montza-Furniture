const { colorModel } = require("../../models/colorModel")

let colorInsert = async (req, res) => {
    let { colorName, colorCode, colorOrder } = req.body

    let obj;
    let colorStatus = false;
    try {
        let insertObj = {
            colorName, // here we can write - model fieldname=fronthand field name if both name ara same write only one name
            colorCode,
            colorOrder,
            colorStatus
        }

        let colorRes = await colorModel.insertOne(insertObj)
        //   console.log(insertObj)

        obj = {
            status: 1,
            msg: "colour inserted successfully!!!",
            colorRes
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

let colorView = async (req, res) => {
    let { currentPage, limit } = req.query;

    let searchobj = {


    }
    if (req.query.colorName != "") {
        //searchobj['colorName']= {$regex:req.query.colorName, $options: "i"} through moongoose
        searchobj['colorName'] = new RegExp(req.query.colorName, "i") //through RegExp function
    }

    let obj;
    try {
        let finalSkip = (currentPage - 1) * limit;
        let data = await colorModel.find(searchobj).skip(finalSkip).limit(limit);
        let allData = await colorModel.find(searchobj)

        obj = {
            status: 1,
            totalData: allData.length,
            pages: Math.ceil(allData.length / limit),
            msg: "colour view table",
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

let colorDelete = async (req, res) => {
    let { id } = req.params;
    let obj;
    try {
        let delRes = await colorModel.deleteOne({ _id: id })

        obj = {
            status: 1,
            msg: "colour delete from table",
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

let colorMultiDelete = async (req, res) => {
    let { ids } = req.body;
    console.log(ids);
    let obj;
    try {

        let delMultiRes = await colorModel.deleteMany({ _id: ids })
        obj = {
            status: 1,
            msg: "multiple colors are deleted!!",
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

let ColorUpdate = async (req, res) => {
    let { id } = req.params;
    let { colorName, colorCode, colorOrder } = req.body
    let obj;
    try {
        let updateObj =
        {
            colorName, // here we can write - model fieldname=fronthand field name if both name ara same write only one name
            colorCode,
            colorOrder

        }

        let updateRes = await colorModel.updateOne({ _id: id }, { $set: updateObj })

        obj = {
            status: 1,
            msg: " Color is updated successfully!!!",
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

let singleColorView = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let data = await colorModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "colour view ",
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
    let allColors = await colorModel.find({ _id: ids }).select('colorStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for (let items of allColors) {
        await colorModel.updateOne({ _id: items._id }, { $set: { colorStatus: !items.colorStatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)

}
module.exports = { colorInsert, colorView, colorDelete, colorMultiDelete, ColorUpdate, singleColorView, changeStatus }