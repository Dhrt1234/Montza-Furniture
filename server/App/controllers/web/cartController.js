const { cartModel } = require("../../models/cartModel");

let addToCart = async (req, res) => {
    let { color, id, image, price, qty, title, userId } = req.body;
    let checkproduct = await cartModel.findOne({ productId: id, color, userId })

    let data;
    console.log("checkproduct", checkproduct);

    if (checkproduct) {

        data = {
            status: 0,
            msg: "Item already into cart!!"
        }
    }
    else {
        let obj = {
            color,
            productId: id,
            image,
            price,
            qty,
            title,
            userId

        }

        let cart = await cartModel.insertOne(obj);
        data = {
            status: 1,
            msg: "Item added into cart!!"
        }
       
    }
     res.send(data);

    console.log("data", data);
}

let userGetCart = async (req, res) => {
    let { userId } = req.body;
    let cartData = await cartModel.find({ userId })
    .populate("color", "colorName")
   
    let resObj = {
        status: 1,
        cartData,
        staticPath: process.env.PRODUCTIMAGEPATH,
    }
    console.log("cartData",cartData);
    res.send(resObj);
}

let deleteCart = async (req, res) => {

    let cartId = req.params.cartId;

    console.log("cartId", cartId);

    let cart = await cartModel.deleteOne({_id:cartId})

    let obj = {

        status: 1,
        msg: "Item deleted from cart!",
        cart
    }

    res.send(obj);
}

module.exports = {deleteCart, addToCart, userGetCart }