import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CreateCom from "./CreateCom"
import * as htmlToImage from "html-to-image"
// import MoonLoader from "react-spinners/MoonLoader"
import SyncLoader from "react-spinners/SyncLoader"
import api from "../utils/api"

const NewCreateDesign = () => {
  const { state } = useLocation()
  const ref = useRef()
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const hasCreatedDesign = useRef(false) // Ref to ensure the design is created only once

  const obj = {
    name: "main_frame",
    type: "rect",
    height: state?.height,
    width: state?.width,
    z_index: 1,
    color: "#fff",
    image: "",
  }

  const createDesign = async () => {
    const image = await htmlToImage.toBlob(ref.current)
    const design = JSON.stringify(obj)

    if (image) {
      const formData = new FormData()
      formData.append("design", design)
      formData.append("image", image)
      try {
        setLoader(true) // Show loader before starting the request
        const { data } = await api.post(`/api/createUserDesign`, formData)
        navigate(`/design/${data.design._id}/edit`)
      } catch (error) {
        console.log(error.response.data.message)
      } finally {
        setLoader(false) // Hide loader after request is completed or failed
      }
    }
  }

  useEffect(() => {
    if (state && ref.current && !hasCreatedDesign.current) {
      createDesign()
      hasCreatedDesign.current = true
    } else if (!state) {
      navigate("/")
    }
  }, [state, ref, navigate])

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <CreateCom info={obj} currentcomponents={{}} />
      </div>
      {loader && (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-100">
          <SyncLoader color="white" />
        </div>
      )}
    </div>
  )
}

export default NewCreateDesign
