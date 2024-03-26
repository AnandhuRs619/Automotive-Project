const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController.js")
const protectRoute = require("../middleware/protectRoute.js");
const multer = require("../middleware/multer.js");


adminRouter.get('/dashboard',adminController.dashboard);
adminRouter.post('/adminLogin',adminController.loginAdmin);
adminRouter.post("/logout",adminController.logoutUser);
adminRouter.delete("/deleteUser/:userId",adminController.deleteUser);
adminRouter.post("/createUser",protectRoute,multer.array("profilePic",1),adminController.createUser);
adminRouter.get("/listUsers",protectRoute,adminController.getUser);
adminRouter.put("/updateUser/:userId",protectRoute,multer.array("profilePic",1),adminController.updateUser);

module.exports = adminRouter;