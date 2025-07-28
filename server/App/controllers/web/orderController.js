const orderModel = require("../../models/orderModels")
const Razorpay = require('razorpay');

const crypto = require('crypto');
const { cartModel } = require("../../models/cartModel");
var instance = new Razorpay({
   key_id: 'rzp_test_WAft3lA6ly3OBc',
   key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});


let saveOrder = async (req, res) => {
   let { paymentMethod } = req.body
   let { shippingAddress } = req.body
   let obj = { ...req.body }
   if (paymentMethod == 1) { //COD

      obj['orderStatus'] = 'process'

      await orderModel.insertOne(obj);
      //Delete Cart Items CartModel
      await cartModel.deleteMany({ userId: obj.userId })
      res.send({ status: 1, msg: "Order Save", paymentMethod })

   }
   else {  //Online
      //DB Order Create
      obj['orderStatus'] = 'pending'
      obj['paymentStatus'] = '1' //pending
      let orderData = await orderModel.insertOne(obj) //order insert in DB mongo DB
      //RazorPay
      //Amount 500*100,
      //"currency": "INR",
      //"receipt": orderData._id,
      console.log("orderData", orderData);
      let orderObj = {
         "amount": req.body.orderAmount * 100, //( in rozorpay amount count is paisa not rupee so we have to multipy 100)
         "currency": "INR",
         "receipt": orderData._id
      }
      //order create in razorpay account not in DB
      let ordersRes = await instance.orders.create(orderObj)
      console.log("res from razor", ordersRes);


      console.log(await orderModel.updateOne({ _id: orderData._id }, {
         $set: {
            razorpayOrderId: ordersRes.id //here we can add razorpayOrderId in DB beacause until this we can not create razorpay ID in DB and using it wecan verify user for payment.
         }
      }))


      res.send({ status: 1, msg: "Order Save", paymentMethod, ordersRes })

   }
}
let verifyOrder = async (req, res) => {


   let { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body

   const hmac = crypto.createHmac('sha256', "68E17CNWY8SemCvZ6ylOkuOY"); //
   hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
   const generated_signature = hmac.digest('hex');


   if (generated_signature == razorpay_signature) {

      console.log("hello");
      await orderModel.updateOne({ razorpayOrderId: razorpay_order_id }, {
         $set: {
            paymentStatus: "2",
            orderStatus: "2",
            razorpayPayment: razorpay_payment_id
         }
      })
      await cartModel.deleteMany({ userId: userId })
      res.send({ status: 1, msg: "Order Save" })
   }
   else {
             res.send({ status: 0, msg: "error in Order Save" })
   }

}

let viewOrder=async (req,res)=>{
   let {userId}=req.body
   let orders=await orderModel.find({userId:userId})
   let resObj={
      status:1,
      data:orders,
      staticPath:process.env.PRODUCTIMAGEPATH,
   }
   res.send(resObj)
}

module.exports = { saveOrder, verifyOrder, viewOrder }