const Admin = require("../models/adminModel.js")
 const generateTokenAndSetCookie = require("../utils/helper/generateToken.js")
 const bcrypt = require("bcryptjs")

const loginAdmin = async (req, res) =>{
	try{
		const {email, password } = req.body;
		const admin = await Admin.findOne({email});
        console.log(admin)
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


const dashboard = async(req,res)=>{
try {

    res.status(200).json("hai dashboard")
} catch (error) {
    res.status(500).json({ error: error.message });
		console.log("Error in updating admin: ", error.message);
}
}

module.exports = {
    dashboard,
    loginAdmin,
}