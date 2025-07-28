let express=require("express")
const { userauthRoutes } = require("./userauthRoutes")
const { homepageRoutes } = require("./homepageRoutes")
const { cartRoute } = require("./cartRoutes")
const { orderRoutes } = require("./orderRoutes")
const { productRoute } = require("./productRoutes")
let webRoutes =express.Router()


webRoutes.use("/user", userauthRoutes) //http://localhost:8000/web/user
webRoutes.use("/home", homepageRoutes)
webRoutes.use("/cart",cartRoute);
webRoutes.use("/order", orderRoutes)
webRoutes.use("/product", productRoute )
module.exports={webRoutes}