import dotenv from "dotenv"
import express from "express"
import conn from "./data"

import auth from "./routes/auth"

dotenv.config()

async function main() {
  await conn()
  const app = express()
  const port = process.env.PORT || 3000

  app.get("/", (req, res) => res.send("Guguk guguk 🐶🐕🐕‍🦺🐩"))
  app.use("/auth", auth)

  // Start server
  app.listen(port, () => {
    console.log(`[MVCH] Listening on http://localhost:${port} 🚀`)
  })
}

main()
