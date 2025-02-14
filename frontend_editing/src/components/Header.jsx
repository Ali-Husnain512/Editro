import { Link } from "react-router-dom"
import * as htmlToImage from "html-to-image"
import api from "../utils/api"
import toast from "react-hot-toast"
import { useState } from "react"

const Header = ({ components, design_id }) => {
  const [loader, setLoader] = useState(false)

  const saveImage = async () => {
    console.log("save images button")
    const mainDesign = document.getElementById("main_design")
    const image = await htmlToImage.toBlob(mainDesign)
    if (image) {
      const designObj = {
        design: components,
      }
      const formData = new FormData()
      formData.append("design", JSON.stringify(designObj))
      formData.append("image", image)
      try {
        setLoader(true)
        const { data } = await api.put(
          `/api/updateUserDesign/${design_id}`,
          formData
        )
        toast.success(data.message)
        setLoader(false)
      } catch (error) {
        setLoader(false)
        toast.error(error.response.data.message)
      }
    }
  }

  const downloadImage = async () => {
    const mainDesign = document.getElementById("main_design")

    const dataUrl = await htmlToImage.toPng(mainDesign, {
      style: {
        transform: "scale(1)",
      },
    })

    var link = document.createElement("a")
    link.download = "image"
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className="h-24 w-full bg-gradient-to-r from-blue-900  via-cyan-300 to-blue-300">
      <div className="flex justify-between items-center px-10 h-full text-gray-500">
        <Link
          to="/"
          className="text-5xl font-bold text-white mt-1 pb-2 px-6 underline cursor-pointer "
        >
          <div className="w-[8rem] h-[5rem] text-center relative">
            <img
              className="absolute inset-0 w-full h-full object-cover cursor-pointer filter grayscale invert"
              src="https://res.cloudinary.com/dbx7qqdys/image/upload/v1707891125/hv1mpfz4xl1tpmtqagpq.svg"
              alt="Editro Logo"
            />
            {/* <h1 className="text-[1rem] font-bold text-white pb-1 px-3  underline  bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-md hover:bg-cyan-700 cursor-pointer">
                
              </h1> */}
          </div>
        </Link>
        <span className="text-5xl text-yellow-100 font-bold underline">
          Editing Tool
        </span>
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-2 m-4 text-white font-bold outline-none bg-[#252627] rounded hover:rounded-full transition-all duration-200 hover:bg-cyan-900"
          >
            {loader ? "Saving..." : "save"}
          </button>
          <button
            onClick={downloadImage}
            className="px-3 py-2 m-4 text-white font-bold outline-none bg-[#252627] rounded hover:rounded-full transition-all duration-200 hover:bg-cyan-900"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
