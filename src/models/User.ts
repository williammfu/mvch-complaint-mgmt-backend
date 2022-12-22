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
  lastLoginAt: Schema.Types.Date, // login timestamp
  complaints: [{ type: Schema.Types.ObjectId }]
})

const User = mongoose.model('User', UserSchema);

export default User
