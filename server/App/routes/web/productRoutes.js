let express = require("express");
const { viewCategory, viewProducts, getProducts } = require("../../controllers/web/productController");


let productRoute = express.Router();
productRoute.get("/viewCategory", viewCategory);
productRoute.get("/view-products/:slug",viewProducts);
productRoute.get('/get-products', getProducts)
module.exports = { productRoute }