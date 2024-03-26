 const express = require("express");
 const dotenv = require("dotenv")
 const app = express();
 const cookieParser = require("cookie-parser")
 const path = require('path');
 const adminRouter = require('./routes/adminRoutes.js')
const productRouter = require("./routes/productRoutes.js")
 const db = require('./database/connectDB.js');
 const bodyParser = require('body-parser');
 const cors = require('cors');


 db();

 dotenv.config();

 app.use(cors());

 app.use(express.json({ limit: '50mb' })); // To parse json data the req.body
app.use(express.urlencoded({extended:true})); // To parse from data in the req.body
app.use(cookieParser());
app.use(bodyParser.json());
app.use( express.static(path.join(__dirname, 'public')));

 const PORT  = process.env.PORT || 5000 ; 
 
// Routes
 app.use('/api/admin',adminRouter)
 app.use("/api/items",productRouter)

 app.listen(PORT,()=> console.log(`Server is Started at http://localhost:${PORT}`))