import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  role: { type: String, enum: ['ADMIN', 'USER'] },
  road: String,
  number: String,
  city: String,
  province: String,
  country: String,
  phoneNum: String,
  token: String, // token string
  lastLoginAt: Date, // login timestamp
  complaints: [{ type: mongoose.Types.ObjectId }]
})

const User = mongoose.model('User', UserSchema);

module.exports = User
