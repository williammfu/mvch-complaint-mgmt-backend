import mongoose from "mongoose"

const conn = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://10.128.0.8:27017/mvch"
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri)
    console.log('[MVCH] MongoDB connected!')
  } catch (err) {
    console.error((err as Error).message)
    process.exit(1)
  }
}

export default conn
