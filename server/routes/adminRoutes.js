const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController.js")

adminRouter.get('/dashboard',adminController.dashboard);
adminRouter.post('/adminLogin',adminController.loginAdmin);
adminRouter.post("/createUser",adminController.createUser);

module.exports = adminRouter;