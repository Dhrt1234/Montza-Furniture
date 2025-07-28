let express=require("express")
    const multer=require('multer')
    let storage= multer.diskStorage({
        destination:function(req,file,cb){
            return cb(null,"uploads/category")
        },
        filename:function(req,file,cb){
            cb(null,`${Date.now()}-${file.originalname}`)
        }
    })

    const upload = multer({storage: storage})

const {categoryInsert, categoryDelete, changeStatus, categoryUpdate, singleCategoryView} = require("../../controllers/admin/categoryController");
const {categoryView} = require("../../controllers/admin/categoryController")

let categoryRoutes=express.Router();

categoryRoutes.post('/insert', upload.single('categoryImage'), categoryInsert)
categoryRoutes.get('/view', categoryView)
categoryRoutes.post("/changeStatus",changeStatus)
categoryRoutes.put("/update/:id", upload.single('categoryImage'),categoryUpdate)
categoryRoutes.get('/view/:id',singleCategoryView)
categoryRoutes.post("/multi-delete/",categoryDelete)
module.exports={categoryRoutes}