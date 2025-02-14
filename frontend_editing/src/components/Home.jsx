import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import api from "../utils/api"
import toast from "react-hot-toast"
import { CiSearch } from "react-icons/ci"
import { useParams } from "react-router-dom"
import Designs from "./Home/Designs"

function Home() {
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 4,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 3,
  //   },
  //   mdtablet: {
  //     breakpoint: { max: 950, min: 464 },
  //     items: 3,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 4,
  //   },
  // }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const { design_id } = useParams()
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
    <>
      <div className="pt-20">
        <div className=" flex w-auto justify-center items-center  relative overflow-hidden rounded-md">
          <div className="flex flex-col items-center justify-center mx-36 rounded-xl h-[35vh] bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 w-full">
            <h2 className="text-[1rem] min-[1200px]:text-[2.25rem] font-bold mx-auto mb-4 text-white hover:text-fuchsia-500 hover:cursor-pointer">
              what will you design today?
            </h2>
            <div className="flex bg-white px-4 mx-4  rounded-lg min-[1200px]:w-[68vw] items-center w-[38vw]">
              <CiSearch />
              <input
                type="text"
                className="p-2 w-full  focus:outline-none"
                placeholder="Search here"
              />
            </div>
          </div>
        </div>
        <div className="py-4 mt-8">
          <h2 className="text-3xl font-semibold text-white pl-10">
            Your recent designs
          </h2>
        </div>
      </div>
      <div className="mx-10 w-auto">
        <Carousel
          autoPlay={true}
          infinite={true}
          responsive={responsive}
          transitionDuration={500}
        >
          {designs.map(
            (img, i) =>
              img._id !== design_id && (
                <Designs design={img} key={i} deleteDesign={deleteDesign} />
              )
          )}
        </Carousel>
        ;
      </div>
    </>
  )
}
export default Home
