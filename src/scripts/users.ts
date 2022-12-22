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
  },
  {
    email: "anindya@gmail.com",
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "Anindya P",
    road: "Jl. Cendrawasih",
    number: "44",
    city: "Kota Bandung",
    province: "West Java",
    country: "Indonesia",
    phoneNum: "623333090",
    complaints: [],
    role: "USER",
    lastLoginAt: new Date()
  },
  {
    email: "hizkia@gmail.com",
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "Hizkia Raditya",
    road: "Jl. Raya Serpong",
    number: "X",
    city: "Tangerang",
    province: "Banten",
    country: "Indonesia",
    phoneNum: "62990123420",
    complaints: [],
    role: "USER",
    lastLoginAt: new Date()
  },
  {
    email: "arief@gmail.com",
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "Arief Purnama",
    road: "Rockford Ave",
    number: "4C",
    city: "Dallas",
    country: "USA",
    phoneNum: "308889120",
    complaints: [],
    role: "ADMIN",
    lastLoginAt: new Date()
  },
  {
    email: "johndoe@gmail.com",
    password: "$2b$10$biOIjjdl9RYUMLFy6R.DIeAW/YCJZm3SLxMxctNGoLbqgl65xoccK",
    fullName: "John Doe",
    road: "Bedford St.",
    number: "6B",
    city: "Pittsburgh",
    country: "USA",
    phoneNum: "9906612552",
    complaints: [],
    role: "USER",
    lastLoginAt: new Date()
  }
]

export const insertUsers = async () => {
  try {
    await User.deleteMany()
    const data = await User.insertMany(mockUsers)
    return data.map(x => ({ _id: x._id, sender: x.fullName! }))
  } catch (err) {
    console.log((err as Error).message)
  }
}
