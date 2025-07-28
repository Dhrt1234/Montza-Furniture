
let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {

    console.log(req.headers.authorization)

    try {
        let token = req.headers.authorization.split(" ")[1] // here split divide token by blank space(" ") and make array of 2 elements . in which 2nd element is token so we write here[1].
       console.log("token from frontend", token);

        let decoded = jwt.verify(token, process.env.TOKENKEY); //here tokenkey is key which is open lock and we can get user data from token because we can store user data by token and use TOKENKEY for lock.
        console.log("user data from check token", decoded);
        req.body.userId = decoded._id; // here we send id to controller(userauthController) from decode userdata middleware(checkToken) then we access userId in controller from req.body with passwords
       console.log(req.body.userId = decoded._id);
        console.log("req.body.userId", req.body.userId);
        next() // next pass middleware to controller without it we can not move controller.
    }
    catch (error) {

        console.log(error)
    }
 
}
module.exports = { checkToken }