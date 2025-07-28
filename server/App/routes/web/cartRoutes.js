let express = require("express");
const { checkToken } = require("../../middleware/checkToken");
const { addToCart, userGetCart, deleteCart } = require("../../controllers/web/cartController");
let cartRoute = express.Router();

cartRoute.post('/add-to-cart', checkToken, addToCart);
cartRoute.post('/view-cart', checkToken, userGetCart);
cartRoute.delete('/delete-cart/:cartId', deleteCart)

module.exports = { cartRoute }
