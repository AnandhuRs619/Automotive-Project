const Admin = require("../models/adminModel.js")
const { find } = require("../models/categoryModel.js")
const User = require("../models/userModel.js")
 const generateTokenAndSetCookie = require("../utils/helper/generateToken.js")
 const bcrypt = require("bcryptjs")
 const productModel = require("../models/productModel.js")

const loginAdmin = async (req, res) =>{
	try{
		const {email, password } = req.body;
		const admin = await User.findOne({email});

		const isPasswordCorrect = await bcrypt.compare(password,admin?.password || "");
		if(!admin || !isPasswordCorrect ) return res.status(400).json({error:"Invalid email or Password"});

		
		generateTokenAndSetCookie(admin._id,res);

		res.status(200).json({
			_id:admin._id,
			name:admin.name,
			email:admin.email,
			adminname:admin.adminname,
			profilePic:admin.profilePic,
			
		})
        console.log("login successfully")

	}catch(error){
		res.status(500).json({error:error.message});
		console.error("Error in loginadmin:",error.message);
	}
 }

 const createUser = async(req,res)=>{
    try {
      
            const { name, email, username, password ,role } = req.body;
            console.log(req.body)
            const user = await User.findOne({ $or: [{ email }, { username }] });
             
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const newUser = new User({
                name,
                email,
                username,
                password: hashedPassword,
                role:role,
            });
            const savedUser = await newUser.save();
            console.log('Saved User:', savedUser);
    
            if (newUser) {
                generateTokenAndSetCookie(newUser._id, res);
    
                res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
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
        const userId = req.params.userId; // Extract user ID from request parameters
        const { name, username, role } = req.body; // Extract updated user details from request body

        // Find the user by ID
        let user = await User.findById(userId);

        // If user does not exist, return a 404 error
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's details
        user.name = name;
        user.username = username;
        user.role = role;

        // Save the updated user object
        const updatedUser = await user.save();

        // Return the updated user details in the response
        res.status(200).json({message:"User update successfully ",updatedUser});
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//  const setRoles = async(req,res)=>{
//     try {
//         const { userIds, role } = req.body;
//         // const admin = req.user; // Assuming user information is stored in req.user

//         // // Validate if user is an admin
//         // if (!admin || admin.role !== 'admin') {
//         //     return res.status(401).json({ error: "Unauthorized" });
//         // }

//         // Update roles for the specified user IDs
//         const result = await User.updateMany(
//             { _id: { $in: userIds } }, // Match users by their IDs
//             { role } // Set the new role
//         );

//         console.log(`${result.nModified} users updated`);

//         res.status(200).json({ message: `${result.nModified} users updated` });
//     } catch (error) {
//         res.status(400).json({ error: "Internal Server Error" });
//     }
//  }

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
    getUser,
    updateUser,
}