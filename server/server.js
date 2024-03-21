 const express = require("express");
 const dotenv = require("dotenv")
 const app = express();
 const cookieParser = require("cookie-parser")
 const adminRouter = require('./routes/adminRoutes.js')
 const db = require('./database/connectDB.js');

db();
 dotenv.config();

 
 app.use(express.json({ limit: '50mb' })); // To parse json data the req.body
app.use(express.urlencoded({extended:true})); // To parse from data in the req.body
app.use(cookieParser());

 const PORT  = process.env.PORT || 5000 ; 

 app.use('/admin',adminRouter)

 app.listen(PORT,()=> console.log(`Server is Started at http://localhost:${PORT}`))