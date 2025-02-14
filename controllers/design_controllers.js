const { formidable } = require("formidable")
const cloudinary = require("cloudinary").v2
const designModal = require("../models/design_modal")
const userImages = require("../models/userImages")
const backgroundImagesModel = require("../models/background")
const designImageModel = require("../models/designImage")
const {
  mongo: { ObjectId },
} = require("mongoose")
class designController {
  createUserDesign = async (req, res) => {
    const form = formidable({})
    const { _id } = req.userInfo

    try {
      cloudinary.config({
        cloud_name: process.env.cloudnary_name,
        api_key: process.env.cloudnary_api_key,
        api_secret: process.env.cloudnary_api_secret,
      })

      const [fields, files] = await form.parse(req)
      const { image } = files
      const { url } = await cloudinary.uploader.upload(image[0].filepath)
      const design = await designModal.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: url,
      })
      return res.status(201).json({ design })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message })
    }
  }
  getUserDesign = async (req, res) => {
    const { design_id } = req.params
    try {
      const design = await designModal.findById(design_id)
      return res.status(200).json({ design: design.components })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  deleteUserDesign = async (req, res) => {
    const { design_id } = req.params
    try {
      await designModal.findByIdAndDelete(design_id)
      return res.status(200).json({ message: "Deleted SuccessFully" })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  updateUserDesign = async (req, res) => {
    const form = formidable({})
    const { design_id } = req.params
    try {
      cloudinary.config({
        cloud_name: process.env.cloudnary_name,
        api_key: process.env.cloudnary_api_key,
        api_secret: process.env.cloudnary_api_secret,
      })

      const [fields, files] = await form.parse(req)
      const { image } = files
      const components = JSON.parse(fields.design[0]).design

      const old_design = await designModal.findById(design_id)
      if (old_design) {
        if (old_design.image_url) {
          const splitImage = old_design.image_url.split("/")
          const imageFile = splitImage[splitImage.length - 1]
          const imageName = imageFile.split(".")[0]
          await cloudinary.uploader.destroy(image)
        }
        const { url } = await cloudinary.uploader.upload(image[0].filepath)
        await designModal.findByIdAndUpdate(design_id, {
          image_url: url,
          components,
        })
        return res.status(200).json({ message: "Image updated saved" })
      } else {
        return res.status(404).json({ message: "Design is not found" })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  addUserImage = async (req, res) => {
    const { _id } = req.userInfo

    const form = formidable({})

    cloudinary.config({
      cloud_name: process.env.cloudnary_name,
      api_key: process.env.cloudnary_api_key,
      api_secret: process.env.cloudnary_api_secret,
    })
    try {
      const [_, files] = await form.parse(req)
      const { image } = files
      const { url } = await cloudinary.uploader.upload(image[0].filepath)

      const ImageUser = await userImages.create({
        user_id: _id,
        image_url: url,
      })
      return res.status(201).json({ ImageUser })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  getUserImage = async (req, res) => {
    const { _id } = req.userInfo
    try {
      const images = await userImages.find({ user_id: new ObjectId(_id) })
      return res.status(200).json({ images })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  getDesignImage = async (req, res) => {
    try {
      const images = await designImageModel.find({})
      return res.status(200).json({ images })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  getBackgroundImage = async (req, res) => {
    try {
      const images = await backgroundImagesModel.find({})
      return res.status(200).json({ images })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  getDesigns = async (req, res) => {
    const { _id } = req.userInfo
    try {
      const designs = await designModal
        .find({ user_id: new ObjectId(_id) })
        .sort({ createdAt: -1 })
      return res.status(200).json({ designs })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

module.exports = new designController()
