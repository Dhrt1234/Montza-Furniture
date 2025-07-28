const { faqModel } = require("../../models/faqModel");

let faqInsert = async (req, res) => {
    let { faqQue, faqAns, faqOrder } = req.body
    let obj;
    let faqStatus = true;
    try {
        let insertObj = {
            faqQue,
            faqAns,
            faqOrder,
            faqStatus
        }
        let faqRes = await faqModel.insertOne(insertObj)
        obj = {

            status: 1,
            msg: "Question is inserted successfully!!",
            faqRes
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

let faqView = async (req, res) => {

    let { currentPage, limit } = req.query;

    let searchobj = {


    }
    if (req.query.faqQue != "") {
        //searchobj['faqQue']= {$regex:req.query.faqQue, $options: "i"} through moongoose
        searchobj['faqQue'] = new RegExp(req.query.faqQue, "i") //through RegExp function
    }
    let obj;
    try {

        let finalSkip = (currentPage - 1) * limit;
        let data = await faqModel.find(searchobj).skip(finalSkip).limit(limit);
        let allData = await faqModel.find(searchobj);

        obj = {
            status: 1,
            totalData: allData.length,
            pages: Math.ceil(allData.length / limit),
            msg: "Faq view table",
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

let faqDelete = async (req, res) => {
    let { id } = req.params;
    let obj;
    try {
        let delRes = await faqModel.deleteOne({ _id: id })
        obj = {
            status: 1,
            msg: "Faq Deleted successfully!",
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
let fqaMultiDelete = async (req, res) => {
    let { ids } = req.body;
    console.log(ids);
    let obj;
    try {

        let delMultiRes = await faqModel.deleteMany({ _id: ids })
        obj = {
            status: 1,
            msg: "multiple faq are deleted!!",
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
let faqUpdate = async (req, res) => {
    let { id } = req.params;
    let { faqQue, faqAns, faqOrder } = req.body
    let obj;
    try {
        let updateObj =
        {
            faqQue,
            faqAns,
            faqOrder

        }

        let updateRes = await faqModel.updateOne({ _id: id }, { $set: updateObj })

        obj = {
            status: 1,
            msg: "Faq is updated successfully!!",
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
let singleFaqView = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let data = await faqModel.findOne({ _id: id })

        obj = {
            status: 1,
            msg: "faq view ",
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
    let allFaqs = await faqModel.find({ _id: ids }).select('faqStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for (let items of allFaqs) {
        await faqModel.updateOne({ _id: items._id }, { $set: { faqStatus: !items.faqStatus } })
    }
    let obj = {
        status: 1,
        msg: "Status has been changed!!",

    }
    res.send(obj)

}
module.exports = { faqInsert, faqView, faqDelete, fqaMultiDelete, faqUpdate, singleFaqView, changeStatus }