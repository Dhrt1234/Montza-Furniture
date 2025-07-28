let express=require("express");

const { materialInsert,materialView,materialDelete, changeStatus } = require("../../controllers/admin/materialController");
const { materialMultiDelete } = require("../../controllers/admin/materialController");
const { materialUpdate } = require("../../controllers/admin/materialController");

const { singleMaterialView } = require("../../controllers/admin/materialController");
let materialRoutes=express.Router();

materialRoutes.post("/insert",materialInsert)

//http://localhost:8000/admin/material/view
materialRoutes.get("/view",materialView)
materialRoutes.delete("/delete/:id",materialDelete)
materialRoutes.post("/multi-delete",materialMultiDelete)
materialRoutes.put("/update/:id",materialUpdate)
materialRoutes.get("/view/:id",singleMaterialView)
materialRoutes.post("/changeStatus",changeStatus)





module.exports={materialRoutes}