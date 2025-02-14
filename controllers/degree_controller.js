const DegreeDataModel = require("../models/Degree")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = require("express")
const bodyParser = require("body-parser")
const Degree = require("../models/Degree")

class degreeController {
  degree_register = async (req, res) => {
    // console.log(req.body);
    const { rollNo, obtainNo, name, institute } = req.body
    // console.log(name,email,password)
    // name= name.trim()
    // email= email.trim()
    // password= password.trim()

    try {
      const get_degree = await Degree.findOne({ rollNo }).select("+obtainNo")
      if (get_degree) {
        return res.status(404).json({ message: "Degree is allready register" })
      } else {
        const degree = await Degree.create({
          rollNo,
          obtainNo,
          name,
          institute,
        })
        // EditroHusnain is the secret key for jwt
        return res.status(201).json({ message: "Register Succesfully", degree })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Server error(internal)" })
    }
  }

  docs_verification = async (req, res) => {
    const { rollNo, obtainNo } = req.body
    console.log(rollNo, obtainNo, "reg body data")
    try {
      const get_degree = await Degree.findOne({ rollNo }).select("+obtainNo")
      console.log(get_degree, "aa")

      if (get_degree) {
        if (obtainNo === get_degree.obtainNo) {
          return res
            .status(200)
            .json({ message: "Verification Successfully", get_degree })
        } else {
          return res.status(404).json({ message: "obtainNo does not match" })
        }
      } else {
        return res.status(404).json({ message: "RollNo does not exist" })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Server error (internal)" })
    }
  }

  // docs_verification = async (req, res) => {
  //   const { responses } = req.body
  //   try {
  //     const degree = await degree_Model.findOne({ rollNo: responses.rollNo })

  //     if (degree) {
  //       if (responses.obtainNo === degree.obtainNo) {
  //         return res.status(200).json({ message: "Verification Successfully" })
  //       } else {
  //         return res.status(404).json({ message: "obtainNo does not match" })
  //       }
  //     } else {
  //       return res.status(404).json({ message: "RollNo does not exist" })
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //     return res.status(500).json({ message: "Server error (internal)" })
  //   }
  // }

  // docs_verification = async (req, res) => {
  //   const { responses } = req.body
  //   try {
  //     const degree = await degree_Model
  //       .findOne(responses.rollNo)
  //       .select("+obtainNo")
  //     if (degree) {
  //       if (responses.obtainNo === degree.obtainNo) {
  //         // EditroHusnain is the secret key for jwt
  //         return res.status(200).json({ message: "Verification Succesfully" })
  //       } else {
  //         return res.status(404).json({ message: "obtainNo does not match" })
  //       }
  //     } else {
  //       return res.status(404).json({ message: "RollNo does not exist" })
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //     return res.status(500).json({ message: "Server error(internal)" })
  //   }
  // }

  // getDegreeData = async (req, res) => {
  //   const { design_id } = req.params
  //   try {
  //     const design = await designModal.findById(design_id)
  //     return res.status(200).json({ design: design.components })
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message })
  //   }
  // }
}

//new object
module.exports = new degreeController()
