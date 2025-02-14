const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Verification = require("../models/DegreeData")

const app = express()

const PostMethod = async () => {
  app.use(bodyParser.json())
  app.post("/api/createDegree", async (req, res) => {
    const { verifiedData } = req.body

    try {
      // Save the data to MongoDB
      const verification = new Verification(verifiedData)
      await verification.save()

      res.status(200).json({ message: "Data saved successfully" })
    } catch (error) {
      console.error("Error saving data:", error)
      res.status(500).json({ message: "Internal Server Error" })
    }
  })
}

export default PostMethod
