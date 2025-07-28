const { sliderData, getproductBtType, getBestSellingProduct, getsingleProduct, getUpSellingProduct, getTopRatedProduct, getFaq, getTestimonials, megaMenu } = require("../../controllers/web/homeController");

let express = require("express")
/* let sliderRoutes=express.Router();
sliderRoutes.get('/view', sliderView) */
let homepageRoutes = express.Router();
homepageRoutes.get('/slider', sliderData);
homepageRoutes.get('/getProductType/:type', getproductBtType);
homepageRoutes.get('/getBestsellProduct', getBestSellingProduct);
homepageRoutes.get('/getUpsellProduct', getUpSellingProduct);
homepageRoutes.get('/getTopRatedProduct', getTopRatedProduct);
homepageRoutes.get('/getFaq', getFaq);
homepageRoutes.get('/getTestimonials', getTestimonials);
homepageRoutes.get('/getMegaMenu', megaMenu);
homepageRoutes.get('/view/:slug', getsingleProduct)


module.exports = { homepageRoutes }