const { register, login, changePassword, SendOtp, verifyOTP, getUser, userUpdate, googleLogin } = require("../../controllers/web/userauthController");
const multer= require("multer");
const { checkToken } = require("../../middleware/checkToken");
express=require("express");

userauthRoutes=express.Router();
let uploads=multer()
userauthRoutes.post('/register', uploads.none(), register)
userauthRoutes.post('/login',uploads.none(),login)
userauthRoutes.post('/change-password',checkToken, changePassword)
userauthRoutes.post('/send-otp', SendOtp)
userauthRoutes.post('/verify-otp',verifyOTP)
userauthRoutes.post('/user-data',checkToken,getUser)
userauthRoutes.put('/user-update',checkToken,userUpdate)
userauthRoutes.post('/google-login',googleLogin)
module.exports={userauthRoutes}