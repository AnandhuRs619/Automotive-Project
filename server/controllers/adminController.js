const Admin = require("../models/adminModel.js")
const User = require("../models/userModel.js")
 const generateTokenAndSetCookie = require("../utils/helper/generateToken.js")
 const bcrypt = require("bcryptjs")

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
		console.log("Error in loginadmin:",error.message);
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


const dashboard = async(req,res)=>{
try {

    res.status(200).json("hai dashboard")
} catch (error) {
    res.status(500).json({ error: error.message });
		console.log("Error in updating admin: ", error.message);
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
}