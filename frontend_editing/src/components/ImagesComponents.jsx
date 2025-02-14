import { useEffect, useState } from "react"
import Image from "./Image"
import api from "../utils/api"
import BarLoader from "react-spinners/BarLoader"
import toast from "react-hot-toast"

const ImagesComponents = ({ add_item }) => {
  const [images, setImages] = useState([])
  const [loader, setLoader] = useState(false)
  const imageUpload = async (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      try {
        setLoader(true)
        const { data } = await api.post("/api/addUserImage", formData)
        setImages([...images, data.ImageUser])
        setLoader(false)
      } catch (error) {
        setLoader(false)
        toast.error(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    const getImage = async () => {
      try {
        const { data } = await api.get("/api/getUserImage")
        setImages(data.images)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])
  return (
    <div className="pl-4 ">
      <div className="w-[18vw] h-[4vh] m-3 flex justify-center items-center bg-cyan-500 rounded-sm hover:cursor-pointer hover:font-bold text-white mb-3">
        <label htmlFor="image" className="text-center cursor-pointer">
          Upload image
        </label>
        <input
          readOnly={loader}
          onChange={imageUpload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>
      {loader && (
        <div className="flex justify-center items-center mb-3">
          <BarLoader />
        </div>
      )}
      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        <Image add_item={add_item} images={images} />
      </div>
    </div>
  )
}

export default ImagesComponents
