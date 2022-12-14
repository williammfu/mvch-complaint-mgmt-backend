import mongoose, { Schema, Types } from "mongoose"

export type UserType = {
  email: string,
  password: string,
  fullName: string,
  role: string,
  road: string,
  number: string,
  city: string,
  province: string,
  country: string,
  phoneNum: string,
  token: string, // token string
  lastLoginAt: Date, // login timestamp
  complaints: [{ type: Types.ObjectId }]
}

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
  lastLoginAt: Schema.Types.Date, // login timestamp
  complaints: [{ type: mongoose.Types.ObjectId }]
})

const User = mongoose.model('User', UserSchema);

export default User
