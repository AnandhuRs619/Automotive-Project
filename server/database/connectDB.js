const mongoose = require("mongoose")
 
const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://ananthurs619:anandhu@cluster0.lyrhaf1.mongodb.net/Inventory_Management_System', {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);

		process.exit(1);
	}
};

module.exports = connectDB;