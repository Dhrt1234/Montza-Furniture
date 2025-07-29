let express=require("express");
let mongoose=require("mongoose")// for database
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let app=express();
let cors=require("cors");
const { adminModel } = require("./App/models/adminModel");
const { webRoutes } = require("./App/routes/web/webRoutes");
const { companyModel } = require("./App/models/companyModel");
// app.use(cors())
app.use(cors({
  origin: 'https://montza-furniture-admin.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json())
require("dotenv").config()// for imp credentials files
app.use("/admin",adminRoutes)//http://localhost:8000/admin
app.use("/web", webRoutes)//http://localhost:8000/web
app.use("/uploads/category", express.static("uploads/category"))
app.use("/uploads/slider", express.static("uploads/slider"))
app.use("/uploads/whychoose", express.static("uploads/whychoose"))
app.use("/uploads/testimonial", express.static("uploads/testimonial"))
app.use("/uploads/subcategory", express.static("uploads/subcategory"))
app.use("/uploads/sub_subcategory", express.static("uploads/sub_subcategory"))
app.use("/uploads/product", express.static("uploads/product"))
app.use("/uploads/sub_subcategory", express.static("uploads/sub_subcategory"))

// mongoose.connect('mongodb://127.0.0.1:27017/ecomFurniture')// database connectivity
mongoose.connect(' mongodb+srv://dharti0212business:yCGRjwLwYUGxHIfT@cluster0.qztmpw9.mongodb.net/')// database connectivity
.then(  async (res)=>{

   let checkAdmin = await adminModel.find() //[] ==0

   if(checkAdmin.length==0){ //True
        adminModel.insertOne(
            {
                adminEmail:process.env.ADMINEMAIL,
                adminPassword:process.env.ADMINPASSWORD
            }
        )
   }

   let checkCompany = await companyModel.find();

   if(checkCompany.length==0){

    companyModel.insertOne(
      {  companyEmail:process.env.COMPANYEMAIL,
        companyName:process.env.COMPANYNAME
      }
    )
   }

    console.log("DB Connect")
    app.listen(process.env.PORT)

})
