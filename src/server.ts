import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import conn from "./data"

import user from "./routes/user"

dotenv.config()

async function main() {
  await conn()
  const app = express()
  const port = process.env.PORT || 3000

  app.use(cors())
  app.use(morgan("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get("/", (_, res) => res.send("Guguk guguk 🐶🐕🐕‍🦺🐩"))
  app.use("/user", user)

  // Start server
  app.listen(port, () => {
    console.log(`[MVCH] Listening on http://localhost:${port} 🚀`)
  })
}

main()
