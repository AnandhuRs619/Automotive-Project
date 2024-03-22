 const express = require("express");
 const dotenv = require("dotenv")
 const app = express();
 const cookieParser = require("cookie-parser")
 const adminRouter = require('./routes/adminRoutes.js')
const productRouter = require("./routes/productRoutes.js")
 const db = require('./database/connectDB.js');
 const bodyParser = require('body-parser');


 db();

 dotenv.config();

 
 app.use(express.json({ limit: '50mb' })); // To parse json data the req.body
app.use(express.urlencoded({extended:true})); // To parse from data in the req.body
app.use(cookieParser());
app.use(bodyParser.json());

 const PORT  = process.env.PORT || 5000 ; 

// Routes

 app.use('/admin',adminRouter)
 app.use("/items",productRouter)

 app.listen(PORT,()=> console.log(`Server is Started at http://localhost:${PORT}`))