let express=require("express");

    const multer=require('multer')
    let storage= multer.diskStorage({
        destination:function(req,file,cb){
            return cb(null,"uploads/admin")
        },
        filename:function(req,file,cb){
            cb(null,`${Date.now()}-${file.originalname}`)
        }
    })

    const upload = multer({storage: storage})





const { adminLogin, forgotSendOTP, verifyOTP, resetPassword, changePassword,adminData, adminUpdate} = require("../../controllers/admin/adminauthController");



let adminauthRoutes=express.Router();

adminauthRoutes.post('/login',adminLogin)
adminauthRoutes.put("/update/:adminID", upload.single('adminImage'),adminUpdate)
adminauthRoutes.post('/send-otp',forgotSendOTP) //

adminauthRoutes.post('/verify-otp',verifyOTP)

adminauthRoutes.post('/reset-password',resetPassword)

adminauthRoutes.post('/change-password', changePassword)

adminauthRoutes.get('/getadmin/:adminID', adminData) 
module.exports={adminauthRoutes}