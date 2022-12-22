import Complaint from "../models/Complaint";
import User from "../models/User";
import mongoose, { Types } from "mongoose";

// resolved checking unresolved
const mockComplaints = [
  {
    nameAffected: 'William Fu',
    sender: 'William Fu',
    selfAffected: 'yes',
    hospitalName: 'MVCH Vancouver Branch',
    facility: 'Radiology',
    createdAt: new Date('2022-12-20'),
    description: 'I had an unpleasant experience during my treatment. My radiologist seemed inexperienced',
    files: null,
    complainReplies: [],
    status: 'resolved'
  },
  {
    nameAffected: 'John Doe',
    sender: 'William Fu',
    selfAffected: 'no',
    hospitalName: 'MVCH Dallas Branch',
    facility: 'Ambulance',
    createdAt: new Date('2022-11-20'),
    description: 'The ambulance driver did not drive safely despite the empty road, which hinders the ER procedure inside the ambulance',
    files: null,
    complainReplies: [],
    status: 'resolved'
  },
  {
    nameAffected: 'William Fu',
    sender: 'William Fu',
    selfAffected: 'yes',
    hospitalName: 'MVCH Vancouver Branch',
    facility: 'Pharmacy',
    createdAt: new Date('2022-12-22'),
    description: 'I received the wrong dosage of medicine.',
    files: null,
    complainReplies: [],
    status: 'unresolved'
  },
  {
    nameAffected: 'Anindya P',
    sender: 'Anindya P',
    selfAffected: 'yes',
    hospitalName: 'Rumah Sakit Mountain View Cabang Bandung',
    facility: 'Dental Facility',
    createdAt: new Date(),
    description: 'My dental hygenist did not perform their job properly. I had a scar under my tounge from the tools.',
    files: null,
    complainReplies: [],
    status: 'unresolved'
  },
  {
    nameAffected: 'Jane Doe',
    sender: 'Hizkia Raditya',
    selfAffected: 'no',
    hospitalName: 'Rumah Sakit Mountain View Cabang Bogor',
    facility: 'Laboratory',
    createdAt: new Date('2022-12-19'),
    description: 'My daughter received the wrong diagnosis addressed to different person',
    files: null,
    complainReplies: [{
      senderId: new mongoose.Types.ObjectId('63a456f174900a368723142a'),
      senderName: 'Admin Fu',
      senderRole: 'ADMIN',
      createdAt: new Date(),
      content: 'On behalf of the staff, we express our apology. We will look into it shortly. Could we know when was the procedure performed?'
    }],
    status: 'checking'
  }
]

export const insertComplaints = async (arr: { _id: Types.ObjectId, sender: string }[]) => {
  try {
    await Complaint.deleteMany()

    for (let com of mockComplaints) {
      if (com.complainReplies.length > 0) {
        for (let rep of com.complainReplies) {
          for (let user of arr) {
            if (user.sender == rep.senderName) {
              rep.senderId = user._id
            }
          }
        }
      }
    }

    const data = await Complaint.insertMany(mockComplaints)
    for (let com of data) {
      for (let user of arr) {
        if (user.sender == com.sender) {
          const myUser = await User.findById({ _id: user._id })
          myUser!.complaints.push(com._id)
          await myUser?.save()
        }
      }
    }
  } catch (err) {
    console.log((err as Error).message)
  }
}