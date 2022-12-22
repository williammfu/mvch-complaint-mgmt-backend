import { insertHospitals } from "./hospitals";
import { insertUsers } from "./users";
import conn from "../data";
import { insertComplaints } from "./complaints";

conn()
  .then(x => {
    console.log("Connected to DB")
    return insertHospitals()
  })
  .then(x => {
    console.log("Hospital data loaded")
    return insertUsers()
  })
  .then(x => {
    console.log("User data loaded")
    return insertComplaints(x!)
  })
  .then(x => {
    console.log("Complaint data loaded")
    process.exit()
  })
  .catch(err => {
    console.log((err as Error).message)
    process.exit()
  })
