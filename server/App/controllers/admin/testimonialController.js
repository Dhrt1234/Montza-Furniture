let fs = require("fs");
const { testimonialModel } = require("../../models/testimonialModel");

let testimonialInsert = async (req, res) => {
    let { name, designation, rating, order, message } = req.body
    let status = true;

    let insertobj = {

        name,
        designation,
        rating,
        order,
        message,
        status
    }

    if (req.file) {
        if (req.file.filename) {
            console.log("filename", req.file.filename)
            insertobj['userImage'] = req.file.filename
        }
    }

    try {

        let obj;
        let finalRes = await testimonialModel.insertOne(insertobj);
        console.log(finalRes)
        obj = {
            status: 1,
            msg: "Testimonial is saved successfully!!!",
            finalRes
        }

        console.log("success", obj);
        res.send(obj);
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "slider name already exist...",
            error
        }
        console.log("error", obj)
        res.send(obj)
    }
}

let testimonialView = async (req, res) => {

    let { currentPage, limit } = req.query;

    let searchobj = {


    }
    if (req.query.name != "") {
        //searchobj['name']= {$regex:req.query.name, $options: "i"} through moongoose
        searchobj['name'] = new RegExp(req.query.name, "i") //through RegExp function
    }

    let finalSkip = (currentPage - 1) * limit;
    let data = await testimonialModel.find(searchobj).skip(finalSkip).limit(limit);
    let allData = await testimonialModel.find(searchobj)

    let obj = {
        status: 1,
        totalData: allData.length,
        pages: Math.ceil(allData.length / limit),
        msg: "testimonial view",
        staticPath: process.env.TESTIMONIALIMAGEPATH,
        data
    }

    res.send(obj)
}
let testimonialDelete = async (req, res) => {
    let { ids } = req.body
    let testimonialView = await testimonialModel.find({ _id: ids }).select("userImage")


    for (let v of testimonialView) {
        let deletePath = "uploads/testimonial/" + v.userImage;
        console.log(deletePath)
        console.log(fs.unlinkSync(deletePath))

    }

    let data = await testimonialModel.deleteMany({ _id: ids })

    let obj = {
        status: 1,
        msg: "Testimonial is deleted successfully!!"
    }

    res.send(obj)
}
let changeStatus = async (req, res) => {
    let { ids } = req.body

    let data = await testimonialModel.updateMany(
        { _id: ids }, [{ $set: { status: { $not: "$status" } } }]
    )

    let obj = {
        status: 1,
        msg: " Status has been changed!!",
        data
    }
    res.send(obj)
}

module.exports = { testimonialInsert, testimonialView, testimonialDelete, changeStatus }