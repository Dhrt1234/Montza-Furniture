let express=require("express");
const { colorInsert, colorView, colorDelete,colorMultiDelete,ColorUpdate,singleColorView, changeStatus} = require("../../controllers/admin/colorController");
let colourRoutes=express.Router();

colourRoutes.post("/insert",colorInsert)

//http://localhost:8000/admin/color/view
colourRoutes.get("/view",colorView)
colourRoutes.get("/view/:id",singleColorView)

colourRoutes.delete("/delete/:id",colorDelete)
colourRoutes.post("/multi-delete",colorMultiDelete)
colourRoutes.put("/update/:id",ColorUpdate)
colourRoutes.post("/changeStatus", changeStatus)
module.exports={colourRoutes}