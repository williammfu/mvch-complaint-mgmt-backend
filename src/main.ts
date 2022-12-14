import express from "express"

function main() {
  const app = express()
  const port = process.env.PORT || 3000
  // endpoint sederhana untuk menampilkan teks 'Hello Express TS'
  app.get("/", (req, res) => res.send("MVCH Complaint Mgmt System 🍃"))
  // mulai server express
  app.listen(port, () => {
    console.log(`[MVCH] Listening on http://localhost:${port} 🚀`)
  })
}

main()
