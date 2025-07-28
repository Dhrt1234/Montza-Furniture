let express=require("express")
const multer=require('multer')
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"uploads/whychoose")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
    })
    console.log(storage)
    const upload=multer({storage: storage})
    console.log(upload)
    const {whychooseInsert, whychooseView, whychooseDelete, changeStatus} =require("../../controllers/admin/whychooseController")
    let whychooseRoutes=express.Router();
    whychooseRoutes.post('/insert',upload.single('userImage'), whychooseInsert)
    whychooseRoutes.get('/view' , whychooseView)
    whychooseRoutes.post('/multi-delete/', whychooseDelete)
    whychooseRoutes.post('/changeStatus',changeStatus)
    module.exports={whychooseRoutes}
