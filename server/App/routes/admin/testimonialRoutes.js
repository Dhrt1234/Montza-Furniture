let express = require("express")
const multer=require('multer')
const { testimonialInsert, testimonialView, testimonialDelete, changeStatus } = require("../../controllers/admin/testimonialController")
let storage=multer.diskStorage({

    destination:function(req,file,cb){
        return cb(null,"uploads/testimonial")
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload= multer({storage: storage})

let testimonialRoutes= express.Router();
testimonialRoutes.post('/insert',upload.single('userImage'), testimonialInsert)
testimonialRoutes.get('/view', testimonialView)
testimonialRoutes.post("/multi-delete/",testimonialDelete) 
testimonialRoutes.post("/changeStatus", changeStatus)
module.exports={testimonialRoutes}