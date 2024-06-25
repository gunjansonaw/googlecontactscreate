const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  birthDay: { type: Number, required: true },
  birthMonth: { type: Number, required: true },
  birthYear: { type: Number, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
