let express=require("express")
const { colourRoutes } = require("./colourRoutes")
const { materialRoutes} = require("./materialRoutes")
const { countryRoutes} =require("./countryRoutes")
const { faqRoutes } = require("./faqRoutes")
const {categoryRoutes} = require("./categoryRoutes")
const { whychooseRoutes } = require("./whychooseRoutes")
const { sliderRoutes} = require("./sliderRoutes")
const { testimonialRoutes } = require("./testimonialRoutes")
const { subcategoryRoutes } = require("./subcategoryRoutes")
const { sub_subcategoryRoutes } = require("./sub-subcategoryRoutes")
const { adminauthRoutes } = require("./adminauthRoute")
const { productRoutes } = require("./productRoutes")
let adminRoutes=express.Router()

//http://localhost:8000/admin/login
adminRoutes.get('/login',(req,res)=>{

    let obj={
        status:1,
        msg:"login"
    }
    res.send(obj)
})


//http://localhost:8000/admin/color
adminRoutes.use("/color",colourRoutes)
adminRoutes.use("/material",materialRoutes)
adminRoutes.use("/country",countryRoutes) 
adminRoutes.use("/faq",faqRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/whychoose",whychooseRoutes)
adminRoutes.use("/slider", sliderRoutes)
adminRoutes.use("/testimonial", testimonialRoutes)
adminRoutes.use("/subcategory", subcategoryRoutes)
adminRoutes.use("/sub_subcategory", sub_subcategoryRoutes)
adminRoutes.use("/auth",adminauthRoutes)
adminRoutes.use("/product",productRoutes)

module.exports={adminRoutes}