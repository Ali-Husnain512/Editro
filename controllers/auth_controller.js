const user_Model = require("../models/user_Model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class authController {
  user_register = async (req, res) => {
    // console.log(req.body);
    const { name, email, password, question } = req.body
    // console.log(name,email,password)
    // name= name.trim()
    // email= email.trim()
    // password= password.trim()

    try {
      const get_user = await user_Model.findOne({ email })
      if (get_user) {
        return res
          .status(404)
          .json({ message: "Email(user) allready register" })
      } else {
        const user = await user_Model.create({
          name,
          email,
          password: await bcrypt.hash(password, 9),
          question,
        })
        const token = await jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user.id,
          },
          "EditroHusnain",
          {
            expiresIn: "1d",
          }
        )
        // EditroHusnain is the secret key for jwt
        return res.status(201).json({ message: "Register Succesfully", token })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Server error(internal)" })
    }
  }
  user_login = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await user_Model.findOne({ email }).select("+password")
      if (user) {
        const match = await bcrypt.compare(password, user.password)
        console.log(match)
        if (match) {
          const token = await jwt.sign(
            {
              email: user.email,
              _id: user.id,
            },
            "EditroHusnain",
            {
              expiresIn: "1d",
            }
          )
          // EditroHusnain is the secret key for jwt
          return res.status(200).json({ message: "Login Succesfully", token })
        } else {
          return res.status(404).json({ message: "password does not match" })
        }
      } else {
        return res.status(404).json({ message: "Email does not exist" })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Server error(internal)" })
    }
  }
  getUsers = async (req, res) => {
    const { email } = req.userInfo
    try {
      const users = await user_Model.find({ email: email })
      return res.status(200).json({ users })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  forgotPassword = async (req, res) => {
    try {
      const { email, newPassword, question } = req.body
      if (!email) {
        return res.send({ message: "email is required" })
      }
      if (!newPassword) {
        return res.send({ message: "newPassword is required" })
      }
      if (!question) {
        return res.send({ message: "question is required" })
      }
      const user = await user_Model.findOne({ email, question })
      if (!user) {
        res.status(400).send({
          success: false,
          message: "email or question are not match",
        })
      }

      await user_Model.findByIdAndUpdate(user._id, {
        password: await bcrypt.hash(newPassword, 9),
      })
      res.status(200).send({
        success: true,
        message: "forgot password successfully",
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "something went Wrong",
        error,
      })
    }
  }
}

//new object
module.exports = new authController()
