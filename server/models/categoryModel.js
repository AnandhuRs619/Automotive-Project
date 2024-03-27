const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
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


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;