 const { countryModel } = require("../../models/countryModel");

let countryInsert = async (req, res) => {
    let { countryName, countryOrder } = req.body
    let obj;
    let countryStatus=true;
    try {

        let insertObj = {
            countryName,
            countryOrder,
            countryStatus
        }
        let countryRes = await countryModel.insertOne(insertObj)
        obj = {
            status: 1,
            msg: "country inserted successfully!!",
            countryRes
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

let countryView = async (req, res) => {

      let { currentPage, limit } = req.query;

    let searchobj = {


    }
     if (req.query.countryName != "") {
        //searchobj['countryName']= {$regex:req.query.countryName, $options: "i"} through moongoose
        searchobj['countryName'] = new RegExp(req.query.countryName, "i") //through RegExp function
    }

    let obj;

    try {

        let finalSkip = (currentPage - 1) * limit;
         let data = await countryModel.find(searchobj).skip(finalSkip).limit(limit);
        let allData = await countryModel.find(searchobj)

        obj = {
            status: 1,
              totalData: allData.length,
            pages: Math.ceil(allData.length / limit),
            msg: "country view table",
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
let countryDelete = async (req, res) => {

    let { id } = req.params;
    let obj;
    try {
        let delRes = await countryModel.deleteOne({ _id: id })

        obj = {
            status: 1,
            msg: "country delete from table",
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
let countryMultiDelete = async (req, res) => {
    let { ids } = req.body;
    console.log(ids);
    let obj;
    try {

        let delMultiRes = await countryModel.deleteMany({ _id: ids })
        obj = {
            status: 1,
            msg: "multiple countrys are deleted!!",
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

let countryUpdate = async (req, res) => {
    let { id } = req.params;
    let { countryName, countryOrder } = req.body
    let obj;
    try {
        let updateObj =
        {
            countryName,
            countryOrder
            
        }

        let updateRes = await countryModel.updateOne({_id: id }, { $set: updateObj })

        obj = {
            status: 1,
            msg: "Country is updated successfully!!",
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

let singlecountryView =async(req,res)=>{

let {id}=req.params;
let obj;
try{
    let data = await countryModel.findOne({_id:id})

     obj = {
        status: 1,
        msg: "country view ",
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

let changeStatus=async (req,res)=>{
    let {ids}=req.body;
    let allcountries=await countryModel.find({_id:ids}).select('countryStatus')//here we can write first condition like _id=ids if this condition will become true then select that _id's materialstatus- selection we can write after conditions.Reverse in mongodb comapre to SQL.
    for(let items of allcountries){
        await countryModel.updateOne({_id:items._id},{$set:{ countryStatus:!items.countryStatus}})
    }
    let obj={
        status:1,
        msg: "Status has been changed!!",
      
    }
    res.send(obj)

}
module.exports = { countryInsert, countryView, countryDelete, countryMultiDelete, countryUpdate,singlecountryView, changeStatus } 