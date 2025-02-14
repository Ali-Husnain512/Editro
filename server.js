const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const user_Model = require("./models/user_Model")

dotenv.config()
app.use(express.json())
if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  )
} else {
  app.use(
    cors({
      credentials: true,
    })
  )
}

app.use("/api", require("./routes/auth_route"))
app.use("/api", require("./routes/design_route"))
app.use("/api", require("./routes/degree_route"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend_editing/dist")))
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./", "frontend_editing", "dist", "index.html")
    )
  })
}

const dbConnect = async () => {
  try {
    console.log("we entered in try")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("production database is connect")
  } catch (error) {
    console.log("During connection of datadbase is some else")
  }
}

dbConnect()

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(`server is listening(start) on Port ${PORT}`)
)
