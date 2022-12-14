import mongoose from "mongoose"

const ResponseSchema = new mongoose.Schema({
  senderId: mongoose.Types.ObjectId,
  content: String,
  senderName: String,
  senderRole: { type: String, enum: ['ADMIN', 'USER'] },
  createdAt: { type: Date, default: Date.now }
})

const ComplaintSchema = new mongoose.Schema({
  nameAffected: String,
  sender: mongoose.Types.ObjectId,
  selfAffected: { type: String, enum: ['yes', 'no'] },
  hospitalName: String,
  facility: String,
  createdAt: { type: Date, default: Date.now },
  description: String,
  files: Buffer,
  complainReplies: [{ type: ResponseSchema }],
  status: String
})

const Complaint = mongoose.model('Complaint', ComplaintSchema)

export default Complaint
