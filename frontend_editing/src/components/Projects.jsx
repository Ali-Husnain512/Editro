import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../utils/api"
import Designs from "./Home/Designs"

const Projects = ({ type, design_id }) => {
  const [designs, setDesigns] = useState([])
  const getDesign = async () => {
    try {
      const { data } = await api.get("/api/getDesigns")
      setDesigns(data.designs)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDesign()
  }, [])

  const deleteDesign = async (design_id) => {
    try {
      const checkString = confirm("Are You Sure to want to delete")
      if (checkString === true) {
        const { data } = await api.delete(`/api/deleteUserDesign/${design_id}`)
        toast.success(data.message)
      }
      getDesign()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  // const deleteDesign = async (design_id) => {
  //   try {
  //     const { data } = await api.delete(`/api/deleteUserDesign/${design_id}`)
  //     toast.success(data.message)
  //     getDesign()
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //   }
  // }
  return (
    <div className="mt-16 overflow-x-auto w-full  overflow-hidden">
      <div
        className={
          type === "main"
            ? "grid grid-cols-1  w-full"
            : "grid grid-cols-4 gap-2 w-full"
        }
      >
        {designs.map(
          (img, i) =>
            img._id !== design_id && (
              <Designs design={img} key={i} deleteDesign={deleteDesign} />
            )
        )}
      </div>
    </div>
  )
}

export default Projects
