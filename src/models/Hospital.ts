import mongoose from "mongoose"

const HospitalSchema = new mongoose.Schema({
  location: String,
  name: String,
  facilities: [{ type: String }],
})

const Hospital = mongoose.model('Hospital', HospitalSchema)

export default Hospital
