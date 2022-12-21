import Hospital from "../models/Hospital";

const idBranch = [
  "Aceh",
  "Denpasar",
  "Bengkulu",
  "DKI Yogyakarta",
  "Jakarta Utara",
  "Bekasi",
  "Jakarta Selatan",
  "Bogor",
  "Tangerang",
  "Gorontalo",
  "Jambi",
  "Bandung",
  "Semarang",
  "Salatiga",
  "Surabaya",
  "Kalimantan Barat",
  "Banjarbaru",
  "Palangkaraya",
  "Samarinda",
  "Tarakan",
  "Pangkal Pinang",
  "Batam",
  "Lampung",
  "Ambon",
  "Ternate",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Jayapura",
  "Manokwari",
  "Pekanbaru",
  "Mamuju",
  "Ujung Pandang",
  "Palu",
  "Kendari",
  "Manado",
  "Kota Padang",
  "Palembang",
  "Medan",
  "Singapore",
  "Kuala Lumpur"
]

const usBranch = [
  "Los Angeles",
  "San Diego",
  "San Jose",
  "San Francisco",
  "Fresno",
  "Sacramento",
  "Newark",
  "Jersey City",
  "Paterson",
  "Wichita",
  "Overland Park",
  "Kansas City",
  "Atlanta",
  "Columbus",
  "St. Louis",
  "Santa Fe",
  "Portland",
  "Eugene",
  "Denver",
  "Colorado Springs",
  "Seattle",
  "Spokane",
  "Tacoma",
  "Vancouver",
  "Boston",
  "Worcester",
  "Springfield",
  "Jacksonville",
  "Miami",
  "Tampa",
  "Orlando",
  "Philadelphia",
  "Pittsburgh",
  "Houston",
  "San Antonio",
  "Dallas",
  "Austin",
  "Chicago",
  "Aurora",
  "Rockford"
]

const facilities = [
  "Pharmacy",
  "Dental Facility",
  "Ambulance",
  "Emergency Room",
  "Operation Room",
  "General Unit",
  "Administration",
  "Intensive Care",
  "Internal Medicine",
  "Pediatrics",
  "Laboratory",
  "Radiology",
  "Physiotherapy",
  "Obgyn"
]

export const insertHospitals = async () => {
  const idHospitals = idBranch.map(x => {
    return {
      location: x,
      name: `Rumah Sakit Mountain View Cabang ${x}`,
      facilities: facilities
    }
  })
  const usHospitals = usBranch.map(x => {
    return {
      location: x,
      name: `MVCH ${x} Branch`,
      facilities: facilities
    }
  })
  const hospitals = [...idHospitals, ...usHospitals]
  try {
    await Hospital.deleteMany()
    const data = await Hospital.insertMany(hospitals)
  } catch (err) {
    console.log((err as Error).message)
  }
}
