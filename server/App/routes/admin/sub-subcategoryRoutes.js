let express=require("express");


const multer  = require('multer');
const { sub_subcategoryInsert, parentCategory, subCategoryData, sub_subcategoryView, changeStatus, singleCategoryView, subSubcategoryUpdate, categoryDelete } = require("../../controllers/admin/sub-subcategoryController");

// const upload = multer({ dest: 'uploads/category' })
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"uploads/sub_subcategory")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`) //6515655515pradeep.jpg
                                                    ////6515655519pradeep.jpg
    }
})
const upload = multer({ storage: storage })






let sub_subcategoryRoutes=express.Router();


sub_subcategoryRoutes.post('/insert', upload.single('sub_subcatImage'),  sub_subcategoryInsert)
sub_subcategoryRoutes.get('/view', sub_subcategoryView) 
sub_subcategoryRoutes.get('/parentcategory',parentCategory)
sub_subcategoryRoutes.get("/subcategory", subCategoryData)
sub_subcategoryRoutes.post("/changeStatus", changeStatus)
sub_subcategoryRoutes.get("/view/:id", singleCategoryView)
sub_subcategoryRoutes.put("/update/:id", upload.single('sub_subcatImage'),subSubcategoryUpdate)
sub_subcategoryRoutes.post("/multi-delete/", categoryDelete)
module.exports={sub_subcategoryRoutes}