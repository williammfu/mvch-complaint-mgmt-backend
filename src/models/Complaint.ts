import mongoose, { Schema } from "mongoose"

const ResponseSchema = new mongoose.Schema({
  senderId: Schema.Types.ObjectId,
  content: String,
  senderName: String,
  senderRole: { type: String, enum: ['ADMIN', 'USER'] },
  createdAt: { type: Date }
})

const ComplaintSchema = new mongoose.Schema({
  nameAffected: String,
  sender: String,
  selfAffected: { type: String, enum: ['yes', 'no'] },
  hospitalName: String,
  facility: String,
  createdAt: { type: Date, default: Date.now },
  description: String,
  files: Buffer,
  complainReplies: [{ type: ResponseSchema }],
  status: String,
  type: String
})

const Complaint = mongoose.model('Complaint', ComplaintSchema)

export default Complaint
