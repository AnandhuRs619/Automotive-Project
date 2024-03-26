const productModel = require("../models/productModel.js")
const categoryModel = require("../models/categoryModel.js")
const User = require("../models/userModel.js");


const addProduct = async (req, res) => {
    try {
      const { name, quantity, price, category, description,enteredBy } =req.body;
        console.log(req.body)
        const user = await User.findById(enteredBy);   
      
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
      // Validate required fields
      if (!name || !price || !category || !description || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      
    //   const images = req.files;
    //   console.log(images);
    //   const imagePaths = [];
  
    //   for (const image of images) {
    //     imagePaths.push(image.filename);
    //   }
  
      const Product = new productModel({
        name,
        quantity,
        price,
        category,
        description,
        // imagePath: imagePaths,
        enteredBy:enteredBy,
      });
  
      await Product.save();
      console.log("New product is added:", Product);
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getProduct = async (req, res) => {
    try {
      const productData = await productModel
        .find()
        .populate('category').populate('enteredBy');
  
      console.log(productData);
  
      res.status(200).json( productData );
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { name, quantity, price, category, description,enteredBy } =req.body;
        
          //   const images = req.files;
    //   console.log(images);
    //   const imagePaths = [];
  
    //   for (const image of images) {
    //     imagePaths.push(image.filename);
    //   }

        // Find the product by ID and update its fields
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            {name, quantity, price, category, description,enteredBy },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Product updated successfully:", updatedProduct);
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


  const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId)
        // const user = req.user; 
        // console.log(user)

        // // Validate if user is an admin
        // if (!user || user.role !== 'admin') {
        //     return res.status(401).json({ error: "Unauthorized" });
        // }

        // Delete the product
        await productModel.findByIdAndDelete(productId);
        console.log("Product deleted successfully");
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
  const addCategory =async (req,res)=>{
    try {
       const{category,enteredBy }= req.body 
       const user = await User.findById(enteredBy);   
      
       if (!user) {
           return res.status(400).json({ error: "User not found" });
       }
       if(!category){
        return res.status(400).json({ error: "Missing required fields" });
       }
       const Category = new categoryModel({
        category,
        enteredBy:enteredBy,
      });
  
      await Category.save();
      console.log("New product is added:", Category);
      res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
        
    }
  }


  module.exports = {
    addProduct,
    getProduct,
    addCategory,
    updateProduct,
    deleteProduct,
  }
  