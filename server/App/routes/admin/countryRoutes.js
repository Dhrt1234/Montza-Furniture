 let express=require("express");
const { countryInsert, countryView, countryDelete,countryMultiDelete,countryUpdate,singlecountryView,changeStatus} = require("../../controllers/admin/countryController");
let countryRoutes=express.Router();

countryRoutes.post("/insert",countryInsert)

//http://localhost:8000/admin/country/view
countryRoutes.get("/view",countryView)
countryRoutes.get("/view/:id",singlecountryView)

countryRoutes.delete("/delete/:id",countryDelete)
countryRoutes.post("/multi-delete",countryMultiDelete)
countryRoutes.put("/update/:id",countryUpdate)
countryRoutes.post("/changeStatus",changeStatus)
module.exports={countryRoutes} 