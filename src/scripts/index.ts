import { insertHospitals } from "./hospitals";
import conn from "../data";

conn()
  .then(x => {
    console.log("Connected to DB")
    return insertHospitals()
  })
  .then(x => {
    console.log("Hospital data loaded")
    process.exit()
  })
  .catch(err => {
    console.log((err as Error).message)
    process.exit()
  })
