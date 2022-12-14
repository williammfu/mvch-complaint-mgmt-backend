require('dotenv').config()
const mongoose = require('mongoose')

const conn = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017")
  console.log('[MVCH] MongoDB connected!')
}

module.exports = {
  conn
}