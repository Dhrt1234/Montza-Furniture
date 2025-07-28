const { transporter } = require("../../Config/mailConfig")
const { adminModel } = require("../../models/adminModel");
let fs = require("fs");

let myOTP = new Map()// OTP store Backend .. -Map is class which store any value in variable not store in DB.



let adminLogin = async (req, res) => {
    console.log(req.body)
    let checkAdmin = await adminModel.findOne(req.body)
    let resObj;
    if (checkAdmin) {
        resObj = {
            status: 1,
            adminID: checkAdmin._id,
            msg: "Login Success"
        }
    }
    else {
        resObj = {
            status: 0,
            msg: "InValid UserName or Password!..."
        }
    }
    res.send(resObj)
}

let adminData = async (req, res) => {

    let { adminID } = req.params
    console.log("admin Id", adminID)
    try {

        let data = await adminModel.findOne({ _id: adminID });
        let obj;
        obj = {

            status: 1,
            msg: "admin details view",
            staticPath: process.env.ADMINIMAGEPATH,
            data
        }
        res.send(obj)
        console.log(obj)
    }
    catch (error) {

        obj = {
            status: 0,
            error
        }
        res.send(obj)
        console.log("error", obj)
    }
}

let adminUpdate = async (req, res) => {
    let { adminID } = req.params

    let { adminName, adminEmail, adminPhone } = req.body
    console.log(adminID, adminName, adminEmail, adminPhone);

    let adminData = {
        adminName,
        adminEmail,
        adminPhone

    }

    if (req.file) {
        if (req.file.filename) {
            adminData['adminImage'] = req.file.filename
        }
    }
    try {
        let adminView = await adminModel.find({ _id: adminID });



       
        for (let v of adminView) {
            if ((v.adminEmail === adminEmail) || (v.adminPhone === adminPhone)) {
                 console.log(v.adminEmail, v.adminPhone);
                obj = {
                    status: 0,
                    msg: "email and phone no can't be update.",

                }
                res.send(obj)
            }
            else {
                if (v.adminImage) {
                    console.log("admin image", v.adminImage);

                    let deletePath = "uploads/admin/" + v.adminImage
                    fs.unlinkSync(deletePath)

                }

                else {
                    console.log("no image");
                }
                let data = await adminModel.updateOne({ _id: adminID }, { $set: adminData })
                obj = {
                    status: 1,
                    msg: "Your Profile is Updated Successfully!!",
                    data
                }
                res.send(obj)

            }


        }

    }

    catch (error) {
        obj = {
            status: 0,
            msg: "Enter Valid Records."
        }
        res.send(obj)
    }
}


let forgotSendOTP = async (req, res) => {
    let { email } = req.body
    console.log(email)
    let admin = await adminModel.findOne({ adminEmail: email })
    if (admin) {

        let otp = Math.floor(Math.random() * 99999999).toString().slice(0, 6)

        myOTP.set("MYOTP", otp) //Backend OTP Store transporter
        const info = await transporter.sendMail({
            from: '"Ecom | Forgot Password OTP" <oracledhrt@gmail.com>',
            to: email,
            subject: "OTP Mail | Forgot Password",
            text: "OTP Mail", // plain‑text body
            html: `<b>OTP ${otp}</b>`, // HTML body
        });

        res.send({ status: 1, msg: "OTP SEND" })
    }
    else {
        res.send({ status: 0, msg: "Invalid Email Id" })
    }


}

let verifyOTP = (req, res) => {
    let { otp } = req.body;
    let backendOTP = myOTP.get("MYOTP")
    if (backendOTP == otp) {
        res.send({ status: 1, msg: "OTP verified successfully. You can now reset your password." })
    }
    else {
        res.send({ status: 0, msg: "Invalaid OTP" })
    }
}
let resetPassword = async (req, res) => {
    let { email, newPassword } = req.body

    let updateRes = await adminModel.updateOne({ adminEmail: email }, {
        $set: {
            adminPassword: newPassword
        }
    })

    res.send({ status: 1, msg: "reset your password successfully." })

}
let changePassword = async (req, res) => {
    let { currentPassword, newPassword, adminID } = req.body;
    let admin = await adminModel.findOne({ adminPassword: currentPassword, _id: adminID })
    if (admin) {

        if (currentPassword != newPassword) {
            let updateRes = await adminModel.updateOne({ _id: adminID }, {
                $set: {
                    adminPassword: newPassword
                }
            })
            res.send({ status: 1, msg: "Password change successfully." })
        }
        else {
            res.send({ status: 0, msg: "Old Password or New  password Change." })
        }

    }
    else {
        res.send({ status: 0, msg: "Invalid Old Password" })
    }
}

module.exports = { adminLogin, adminData, resetPassword, verifyOTP, forgotSendOTP, changePassword, adminUpdate }