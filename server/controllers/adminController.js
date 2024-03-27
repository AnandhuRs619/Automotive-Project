const Admin = require("../models/adminModel.js")
const { find } = require("../models/categoryModel.js")
const User = require("../models/userModel.js")
 const generateTokenAndSetCookie = require("../utils/helper/generateToken.js")
 const bcrypt = require("bcryptjs")
 const productModel = require("../models/productModel.js")
 const fs = require("fs");
const path = require("path");

const loginAdmin = async (req, res) =>{
	try{
		const {email, password } = req.body;
		const user = await User.findOne({email});

		const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
		if(!user || !isPasswordCorrect ) return res.status(400).json({error:"Invalid email or Password"});

		
		generateTokenAndSetCookie(user._id,res);

		res.status(200).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			adminname:user.adminname,
			profilePic:user.profilePic,
			role:user.role
		})
        console.log("login successfully")

	}catch(error){
		res.status(500).json({error:error.message});
		console.error("Error in loginadmin:",error.message);
	}
 }

 const createUser = async(req,res)=>{
    try {
      
            const { name, email, phone, password ,role } = req.body;
            console.log(req.body)
            const user = await User.findOne({ $or: [{ email }, { name }] });
             
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const images = req.files;
            console.log(images);
            const imagePaths = [];

            for (const image of images) {
             imagePaths.push(image.filename);
                 }
    
            const newUser = new User({
                name,
                email,
                phone,
                password: hashedPassword,
                role:role,
                profilePic:imagePaths
            });
            const savedUser = await newUser.save();
            console.log('Saved User:', savedUser);
        
            if (newUser) {
                generateTokenAndSetCookie(newUser._id, res);
    
                res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    bio: newUser.bio,
                    profilePic: newUser.profilePic,
                    role: newUser.role,
                });
            } else {
                res.status(400).json({ error: "Invalid user data" });
            }  
        
    } catch (error) {
        res.status(500).json({error:error.message});
		console.log(error.message)
    }
 }

 const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId; 
        const { name, phone, role } = req.body; 
        

        let user = await User.findById(userId);

       
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

   
        const newImagePaths = [];

        // Check if new profile pictures are uploaded
        if (req.files && req.files.length > 0) {
            // Delete existing profile pictures
            if (user.profilePic && user.profilePic.length > 0) {
                for (const imagePath of user.profilePic) {
                    fs.unlinkSync(path.join(__dirname, "../public/images", imagePath));
                }
            }

            for (const image of req.files) {
                newImagePaths.push(image.filename);
            }
        }

        // Update the user's details
        user.name = name;
        user.phone = phone;
        user.role = role;
        user.profilePic = newImagePaths.concat(user.profilePic || []);

       
        const updatedUser = await user.save();

        
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

 const getUser = async (req, res) => {
    try {
        
        const users = await User.find({ role: { $ne: 'admin' } });

        res.status(200).json(users);
        console.log(users)
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteUser = async(req,res)=>{
    const userId = req.params.userId;
    console.log(userId)
    try {
        const user = User.findById(userId);
        if(!user){
            return res.status(404).json({ error: "User not found" });  
        }
        await User.findByIdAndDelete(userId)
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const dashboard = async(req,res)=>{
    try {
        const inventoryReport = await productModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalQuantity: { $sum: '$quantity' },
                    itemCount: { $sum: 1 },
                },
            },
        ]);
        res.json(inventoryReport);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const logoutUser = async (req,res)=>{
	try {
		res.cookie("jwt","",{maxAge:1});
		res.status(200).json({message:"User logged out"});
        console.log("log out successfully ")

	}catch(error){
		res.status(500).json({ error: error.message });
		console.log("Error in logoutUser: ", error.message);
	}
 }

module.exports = {
    dashboard,
    loginAdmin,
    createUser,
    logoutUser,
    deleteUser,
    getUser,
    updateUser,
}