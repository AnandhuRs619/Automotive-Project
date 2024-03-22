const productRouter = require("express").Router();
const productController = require("../controllers/productController.js");
const protectRoute = require("../middleware/protectRoute.js");


productRouter.post("/additems",protectRoute,productController.addProduct);
productRouter.post('/addCategory',protectRoute,productController.addCategory);
productRouter.get("/getitems",protectRoute,productController.getProduct);
productRouter.post("/deleteItems/:productId",protectRoute,productController.deleteProduct);
productRouter.post("/updateItems/:productId",protectRoute,productController.updateProduct);

module.exports = productRouter;
