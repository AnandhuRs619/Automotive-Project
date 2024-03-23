const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController.js")
const protectRoute = require("../middleware/protectRoute.js");

adminRouter.get('/dashboard',adminController.dashboard);
adminRouter.post('/adminLogin',adminController.loginAdmin);
adminRouter.post("/logout",adminController.logoutUser);
adminRouter.post("/createUser",adminController.createUser);
adminRouter.get("/listUsers",protectRoute,adminController.getUser);
adminRouter.post("/updateUser/:userId",protectRoute,adminController.updateUser);

module.exports = adminRouter;