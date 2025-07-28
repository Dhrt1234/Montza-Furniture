let express=require("express");
const { faqInsert, faqView, faqDelete, fqaMultiDelete, faqUpdate, singleFaqView, changeStatus} = require("../../controllers/admin/faqController");
let faqRoutes=express.Router();
faqRoutes.post("/insert",faqInsert)
faqRoutes.get("/view", faqView)
faqRoutes.delete("/delete/:id", faqDelete)
faqRoutes.post("/multi-delete",fqaMultiDelete)
faqRoutes.put("/update/:id", faqUpdate)
faqRoutes.get("/view/:id",singleFaqView)
faqRoutes.post("/changeStatus",changeStatus)
module.exports={faqRoutes}