const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   
      name: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      imagePath: {
        type: [String],
       
      },
      description: {
        type: String,
        required: true,
      },
      dateEntered: {
        type: Date,
        default: Date.now
      },
      enteredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    
   
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;