let express=require("express")
    const multer=require('multer')
const { sliderInsert, sliderView, sliderDelete, changeStatus } = require("../../controllers/admin/sliderController")
    let storage= multer.diskStorage({
        destination:function(req,file,cb){
            console.log("file upload",cb(null,"uploads/slider"))
            return cb(null,"uploads/slider")
        },
        filename:function(req,file,cb){
            cb(null,`${Date.now()}-${file.originalname}`)
        }
    })

    const upload = multer({storage: storage})


let sliderRoutes=express.Router();

sliderRoutes.post('/insert', upload.single('sliderImage'), sliderInsert)
sliderRoutes.get('/view', sliderView)
sliderRoutes.post("/multi-delete/", sliderDelete)
sliderRoutes.post("/changeStatus", changeStatus)
module.exports={sliderRoutes}