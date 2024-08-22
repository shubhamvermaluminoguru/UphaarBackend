const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {type: String,required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    OTP: { type: String },
    OTPcreatedAt: { type: Date },
    profilePicture: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    countryCode: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


