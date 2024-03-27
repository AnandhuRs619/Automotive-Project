const productRouter = require("express").Router();
const productController = require("../controllers/productController.js");
const protectRoute = require("../middleware/protectRoute.js");
const multer = require("../middleware/multer.js");

productRouter.post("/additems",protectRoute,multer.array("images",1),productController.addProduct);
productRouter.post('/addCategory',protectRoute,productController.addCategory);
productRouter.put('/editCategory/:catagoryId',protectRoute,productController.editCategory);
productRouter.get("/getitems",protectRoute,productController.getProduct);
productRouter.get("/getcategory",protectRoute,productController.getCategory);
productRouter.delete("/deleteItems/:productId",protectRoute,productController.deleteProduct);
productRouter.put("/updateItems/:productId",protectRoute,multer.array("images",1),productController.updateProduct);

module.exports = productRouter;
