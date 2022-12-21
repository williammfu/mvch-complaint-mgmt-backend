import User from "../models/User"

const mockUsers = [
  {
    email: "willi@gmail.com",
    // password: wiili123
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "William Fu",
    road: "Jl. Ciheulang",
    number: "15",
    city: "Kota Bandung",
    province: "West Java",
    country: "Indonesia",
    phoneNum: "6287774523908",
    complaints: [],
    role: "USER",
    lastLoginAt: new Date()
  },
  {
    email: "admin@gmail.com",
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "Admin Fu",
    road: "Jl. Ciheulang",
    number: "15A",
    city: "Kota Bandung",
    province: "West Java",
    country: "Indonesia",
    phoneNum: "6287774523906",
    complaints: [],
    role: "ADMIN",
    lastLoginAt: new Date()
  }
]

export const insertUsers = async () => {
  try {
    await User.deleteMany()
    const data = await User.insertMany(mockUsers)
  } catch (err) {
    console.log((err as Error).message)
  }
}
