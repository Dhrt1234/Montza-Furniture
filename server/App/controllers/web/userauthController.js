const bcrypt = require('bcrypt');
const { transporter } = require("../../Config/mailConfig")

const { userModel } = require('../../models/userModels');
let jwt = require('jsonwebtoken');

let myopt = new Map()

const saltRounds = 10;

let register = async (req, res) => {

    console.log(req.body)
    let { userEmail, userName, userPhone, userPassword } = req.body;

    const hashPassword = bcrypt.hashSync(userPassword, saltRounds);
    console.log(hashPassword)

    let resObj
    try {
        let insertObj = {
            userName: userName,
            userEmail: userEmail,
            userPassword: hashPassword,
            userPhone: userPhone
        }
        let user = await userModel.insertOne(insertObj)
        resObj = {
            status: 1,
            msg: "User is created successfully!!!",
            user
        }
    }
    catch (error) {
        resObj = {
            status: 0,
            msg: "Email Id Already Exists..."
        }
    }

    console.log("register msg", resObj)
    res.send(resObj)
}


let SendOtp = async (req, res) => {

    let { userEmail } = req.body
    console.log("userEmail", userEmail)
    let obj
    try {
        let checkEmail = await userModel.findOne({
            userEmail:
                userEmail
        });
        if (checkEmail) {
            console.log("Email already exists");
            // Email already exists
            obj = {
                status: 0,
                msg: "Email Address Already Exists",
            };
        } else {
            // Generate 6-digit OTP
            let otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("otp", otp);
            myopt.set("MYOTP", otp);
            // Send email
            const info = await transporter.sendMail({
                from: '"Monsta Furniture | Registration OTP" <oracledhrt@gmail.com> ',
                to: userEmail,
                subject: "OTP Mail | Registration OTP",
                text: "OTP Mail",
                html: `<b>OTP: ${otp}</b>`,
            });
            obj = {
                status: 1,
                msg: "OTP Sent Successfully...!!",
            };
        }

    }
    catch (error) {
        console.log("e", error);
        obj = {
            status: 0,
            msg: "error in send otp.",
        }


    }
    res.send(obj);
}


let verifyOTP = (req, res) => {
    let obj
    let { otp } = req.body
    let backEndOtp = myopt.get("MYOTP")

    console.log("otp", otp);
    console.log("backEndOtp", backEndOtp);

    if (backEndOtp == otp) {
        obj = {
            status: 1,
            msg: "Otp Varified...!!"
        }
        res.send(obj)
    }
    else {
        obj = {
            status: 0,
            msg: "Invalid Otp...!!"
        }
        res.send(obj)
    }
    console.log("verify msg", obj);
}


let login = async (req, res) => {
    let myRes;


    let { email, userPassword } = req.body;

    console.log(email, userPassword);

    let cheakEmail = await userModel.findOne({ userEmail: email })
    if (cheakEmail) {

        let dbPassword = cheakEmail.userPassword
        console.log("dbpwd", dbPassword);

        console.log(
            bcrypt.compareSync(userPassword, dbPassword))
        if (bcrypt.compareSync(userPassword, dbPassword)) {
            let user = {
                userName: cheakEmail.userName,
                _id: cheakEmail._id
            }
            console.log("user", user);
            let token = jwt.sign(user, process.env.TOKENKEY);// tolenkey is access key by it we can access token and get user
            console.log("token", token);

            myRes = {
                status: 1,
                msg: "login Success",
                user,
                token
            }
        }
        else {
            myRes = {
                status: 0,
                msg: "Invalid Password"
            }
        }
    }
    else {
        myRes = {
            status: 0,
            msg: "Invalid Email Address"
        }
    }
    res.send(myRes)
    console.log("myres", myRes);
}

let changePassword = async (req, res) => {
    let { oldPassword, newPassword, userId } = req.body
    console.log("req.body from change pwd", req.body);
    let resObj;

    let userdetails = await userModel.findOne({ _id: userId });
    console.log("userdetails", userdetails);
    let dbPassword = userdetails.userPassword

    console.log("dbpwd", dbPassword);
    if (bcrypt.compareSync(oldPassword, dbPassword)) {
        console.log("old new match");

        const hashPassword = bcrypt.hashSync(newPassword, saltRounds);
        console.log(await userModel.updateOne({ _id: userId }, { $set: { userPassword: hashPassword } }));

        resObj = {
            status: 1,
            msg: "Password is changed successfully!! "
        }

    }
    else {
        console.log("old invalid");
        resObj = {
            status: 0,
            msg: "Inavalid Old Password"
        }
    }

    console.log("res", resObj);
    res.send(resObj);
}


let getUser= async(req,res)=>{
let {userId}=req.body;
let data=await userModel.findOne({_id:userId})
let resObj={
    status:1,
    data
}
res.send(resObj);
}


let userUpdate = async (req, res) => {
  

    let { userName,userGender, userAddress, userId } = req.body
    console.log(userName,userGender,userAddress,userId);
        let obj;
    let userData = {
        userName,
        userGender,
        userAddress

    }

    try {
       
 
                let data = await userModel.updateOne({ _id: userId }, { $set: userData })
                console.log("data",data)
                obj = {
                    status: 1,
                    msg: "Your Profile is Updated Successfully!!",
                    data
                }
                res.send(obj)

            


        }

    

    catch (error) {
        obj = {
            status: 0,
            msg: "Enter Valid Records."
        }
        res.send(obj)
        console.log("resobj", obj);
    }
}

let googleLogin= async( req,res)=>{
 
    let myRes;
    let{userName,userEmail,userPhone}=req.body
    console.log(userName,userEmail,userPhone);
    let checkEmail=await userModel.findOne({userEmail:userEmail})
if(checkEmail){
    let user={
        userName:checkEmail.userName,
        id:checkEmail._id
    }
    console.log("email exist",user)
    let token =jwt.sign(user,process.env.TOKENKEY);
    console.log("token", token);
    myRes={
        status:1,
        msg:"Login Sucess",
        user,
        token
    }
}
else{
    let insertObj={
        userName,
        userEmail,
        userPhone
    }

    let myuser=await userModel.insertOne(insertObj);

    let user={
        userName: myuser.userName,
        id: myuser._id
    }
    console.log("email not exist",user)
    let token =jwt.sign(user,process.env.TOKENKEY);
        console.log("token", token);
    myRes={
        status:1,
        msg:"Login Sucess",
        user,
        token
    }

    
}
res.send(myRes);
console.log("myres",myRes)


}
module.exports = {googleLogin, userUpdate, getUser, register, login, changePassword, SendOtp, verifyOTP }