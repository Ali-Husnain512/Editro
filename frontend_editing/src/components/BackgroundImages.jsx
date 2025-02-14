import React, { useEffect, useState } from "react"
import ImagesComponents from "./ImagesComponents"
import api from "../utils/api"
import Image from "./Image"

const BackgroundImages = ({ setImage, type }) => {
  const [images, setImages] = useState([])
  useEffect(() => {
    const getImage = async () => {
      try {
        const { data } = await api.get("]/getBackgroundImage")
        setImages(data.images)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])
  return <Image setImage={setImage} type={type} images={images} />
}

export default BackgroundImages
