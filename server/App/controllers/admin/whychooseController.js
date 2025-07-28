const { whychooseModel } = require("../../models/whychooseModel");

let fs = require("fs")
let whychooseInsert = async (req, res) => {

    let { title, order, description } = req.body
    let whychooseStatus = true;
    let obj = {
        title,
        order,
        description,
        whychooseStatus
    }

    if (req.file) {
        if (req.file.filename) {
            console.log(req.file.filename)
            obj['userImage'] = req.file.filename
        }
    }

    console.log(obj)

    try {

        let whychooseRes = await whychooseModel.insertOne(obj)
        console.log(whychooseRes)
        obj = {
            status: 1,
            msg: "Why choose Save successfully!!",
            whychooseRes
        }
        console.log("success", obj)
        res.send(obj)

    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Why choose already exist...",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }


}

let whychooseView = async (req, res) => {
    let { currentPage, limit } = req.query;

    let searchobj = {


    }
    console.log("matname", req.query.title)
    console.log("matorder", req.query.order)


    if (req.query.title != "") {
        //searchobj['title']= {$regex:req.query.title, $options: "i"} through moongoose
        searchobj['title'] = new RegExp(req.query.title, "i") //through RegExp function
    }

    if (req.query.order != "") {
        searchobj['order'] = Number(req.query.order)
        console.log("searchobj", searchobj['order'])
    }
    
    try {
    let finalSkip = (currentPage - 1) * limit;
    let data = await whychooseModel.find(searchobj).skip(finalSkip).limit(limit);
    let allData = await whychooseModel.find(searchobj)

    let obj = {
        status: 1,
        totalData: allData.length,
        pages: Math.ceil(allData.length / limit),
        msg: "whychoose view",
        staticPath: process.env.WHYCHOOSEIMAGEPATH,
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

let whychooseDelete = async (req, res) => {

    let { ids } = req.body
    let whychooseView = await whychooseModel.find({ _id: ids }).select("userImage")


    for (let v of whychooseView) {
        let deletePath = "uploads/whychoose/" + v.userImage;
        fs.unlinkSync(deletePath)
    }


    try {
        let data = await whychooseModel.deleteMany({ _id: ids })
        let obj = {
            status: 1,
            msg: "Why choose is deleted successfully !!!"
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "why choose does'nt delete",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }
}
let changeStatus = async (req, res) => {
    let { ids } = req.body

    let data = await whychooseModel.updateMany(
        { _id: ids }, [{ $set: { whychooseStatus: { $not: "$whychooseStatus" } } }]
    )

    let obj = {
        status: 1,
        msg: " Status has been changed!!",
        data
    }
    res.send(obj)
}

module.exports = { whychooseInsert, whychooseView, whychooseDelete, changeStatus }