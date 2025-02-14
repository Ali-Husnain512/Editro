import { useEffect, useState, useRef } from "react"
import Header from "../components/Header"
import {
  BsGrid1X2,
  BsCloudUpload,
  BsFolder,
  BsFillImageFill,
} from "react-icons/bs"
import { FaShapes, FaChevronLeft } from "react-icons/fa"
import { TfiText } from "react-icons/tfi"
import { RxTransparencyGrid } from "react-icons/rx"
import ImagesComponents from "../components/ImagesComponents"
import Projects from "../components/Projects"
import CreateCom from "../components/CreateCom"
import JoditEditor from "jodit-react"
import { useParams } from "react-router-dom"
import api from "../utils/api"

const MianEdit = () => {
  // const imageSearchRef = useRef("lands")
  const [imageSearchState, setImageSearchState] = useState("horse")
  const [totalPages, SetTotalpages] = useState(0)
  const [page, setPages] = useState(1)

  const { design_id } = useParams()

  const [ntext, setNText] = useState("Heading_1")
  const editor = useRef(null)
  const [show, setShow] = useState({
    status: true,
    name: "",
  })
  const [color, setColor] = useState("")
  const [state, setState] = useState("")
  const [image, setImage] = useState("")
  const [current_Components, setCurrent_Components] = useState("")
  const [rotate, setRotate] = useState(0)
  const [left, setleft] = useState("")
  const [top, setTop] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [text, setText] = useState("Heading 1")
  const [opacity, setOpacity] = useState("")

  const [padding, setPadding] = useState("")
  const [font, setFont] = useState("")
  const [weight, setWeight] = useState("")
  const [zIndex, setZIndex] = useState("")
  const [titleText, setTitleText] = useState("")
  const [radius, setRadius] = useState(0)
  const [unSplash, setUnsplash] = useState([])
  // const [mainWidth, setmainWidth] = useState(900)

  // const handleChangeSizeWidth = (e) => {
  //   const newValue = parseInt(e.target.value)
  //   setmainWidth(newValue)
  // }

  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 450,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrent_Components: (a) => setCurrent_Components(a),
    },
  ])

  const unSplashPages = 20
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${imageSearchState}&page=${page}&per_page=${unSplashPages}&client_id=yrxLONtM9SN08xYLSgs9RWJ7JXHVP01Gepokf0KE2UI`
      )
      const data = await response.json()
      setUnsplash(data)
      SetTotalpages(data.total_pages) // Set the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // for unsplash

  const setElements = async (type, name) => {
    setState(type)
    setShow({
      status: false,
      name,
    })
    fetchData()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchData()
    // console.log(imageSearchRef.current.value)
  }
  const moveElement = (id, currentInfo) => {
    setCurrent_Components("")
    setCurrent_Components(currentInfo)

    let isMoving = true
    const currentdiv = document.getElementById(id)
    // console.log(currentdiv);
    const mouseMove = ({ movementX, movementY }) => {
      // console.log(currentdiv)
      const getStyle = window.getComputedStyle(currentdiv)
      const left = parseInt(getStyle.left)
      const top = parseInt(getStyle.top)

      if (isMoving) {
        currentdiv.style.left = `${left + movementX}px`
        currentdiv.style.top = `${top + movementY}px`
      }
      // console.log(movementX);
      // console.log(movementY);
    }
    const mouseUp = () => {
      isMoving = false
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseup", mouseUp)
      setleft(parseInt(currentdiv.style.left))
      setTop(parseInt(currentdiv.style.top))
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }
  const resizeElement = (id, currentInfo) => {
    setCurrent_Components("")
    setCurrent_Components(currentInfo)

    let isMoving = true
    const currentdiv = document.getElementById(id)
    // console.log(currentdiv);
    const mouseMove = ({ movementX, movementY }) => {
      // console.log(currentdiv)
      const getStyle = window.getComputedStyle(currentdiv)
      const width = parseInt(getStyle.width)
      const height = parseInt(getStyle.height)

      if (isMoving) {
        currentdiv.style.width = `${width + movementX}px`
        currentdiv.style.height = `${height + movementY}px`
      }
      // console.log(movementX);
      // console.log(movementY);
    }
    const mouseUp = () => {
      isMoving = false
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseup", mouseUp)
      setWidth(parseInt(currentdiv.style.width))
      setHeight(parseInt(currentdiv.style.height))
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }
  const rotateElement = (id, currentInfo) => {
    setCurrent_Components("")
    setCurrent_Components(currentInfo)

    const target = document.getElementById(id)

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target)
      const trans = getStyle.transform

      const values = trans.split("(")[1].split(")")[0].split(",")

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      )

      let deg = angle < 0 ? angle + 360 : angle

      if (movementX) {
        deg = deg + movementX
      } else {
        deg = deg + movementY
      }
      target.style.transform = `rotate(${deg}deg)`
    }

    const mouseUp = () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseup", mouseUp)
      const getStyle = window.getComputedStyle(target)
      const trans = getStyle.transform

      const values = trans.split("(")[1].split(")")[0].split(",")

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      )

      let deg = angle < 0 ? angle + 360 : angle
      setRotate(deg)
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseup", mouseUp)
  }
  const rotateElementFourtyFive = (id) => {
    const target = document.getElementById(id)
    let lastClickTime = 0 // Variable to store the timestamp of the last click

    const mouseClick = () => {
      const now = new Date().getTime() // Get the current timestamp
      const timeDiff = now - lastClickTime

      if (timeDiff > 300) {
        // Check if the time difference is more than 300 milliseconds (adjust as needed)
        const getStyle = window.getComputedStyle(target)
        const trans = getStyle.transform

        const values = trans.split("(")[1].split(")")[0].split(",")
        const angle = Math.round(
          Math.atan2(values[1], values[0]) * (180 / Math.PI)
        )

        let deg = angle < 0 ? angle + 360 : angle
        deg += 90

        target.style.transform = `rotate(${deg}deg)`

        lastClickTime = now // Update the last click timestamp
      }
    }

    target.addEventListener("mousedown", mouseClick)
  }

  const removeComponent = (id) => {
    // console.log('removeComponent')
    const temp = components.filter((c) => c.id !== id)
    setCurrent_Components("")
    setComponents(temp)
  }

  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value))
  }

  const add_item = (img) => {
    const style = {
      id: components.length + 1,
      name: "image",
      type: "image",
      top: 10,
      left: 10,
      opacity: 1,
      width: 200,
      height: 200,
      rotate,
      z_index: components.length + 1,
      image: img,
      radius: 0,
      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setCurrent_Components(style)
    setComponents([...components, style])
  }
  const add_background = (img) => {
    const style = {
      id: components.length + 1,
      name: "background",
      type: "background",
      top: 0,
      left: 0,
      opacity: 1,
      width: 650,
      height: 450,
      rotate,
      z_index: components.length + 1,
      image: img,
      radius: 0,
      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setCurrent_Components(style)
    setComponents([...components, style])
  }

  // console.log(current_Components)
  useEffect(() => {
    if (current_Components) {
      const index = components.findIndex((c) => c.id === current_Components.id)
      const temp = components.filter((c) => c.id !== current_Components.id)

      if (current_Components.name !== "text") {
        components[index].width = width || current_Components.width
        components[index].height = height || current_Components.height
        components[index].rotate = rotate || current_Components.rotate
      }
      if (current_Components.name === "image") {
        // console.log(image)
        components[index].radius = radius || current_Components.radius
      }
      if (current_Components.name === "main_frame" && image) {
        // console.log(image)
        components[index].image = image || current_Components.image
      }
      components[index].color = color || current_Components.color
      if (current_Components.name !== "main_frame") {
        components[index].left = left || current_Components.left
        components[index].top = top || current_Components.top
        components[index].opacity = opacity || current_Components.opacity
        components[index].z_index = zIndex || current_Components.z_index
      }
      if (
        current_Components.name === "text" &&
        current_Components.type === "h1"
      ) {
        components[index].left = left || current_Components.left
        components[index].top = top || current_Components.top
        components[index].width = width || current_Components.width
        components[index].height = height || current_Components.height
        components[index].rotate = rotate || current_Components.rotate
        components[index].text = text || current_Components.text
      }
      if (
        current_Components.name === "text" &&
        current_Components.type === "title"
      ) {
        components[index].padding = padding || current_Components.padding
        components[index].font = font || current_Components.font
        components[index].weight = weight || current_Components.weight
        components[index].title = titleText || current_Components.title
      }

      setComponents([...temp, components[index]])

      setleft("")
      setTop("")
      setWidth("")
      setHeight("")
      setRotate(0)
      setText("")
      setColor("")
      setOpacity("")
      setZIndex("")
      setPadding("")
      setFont("")
      setWeight("")
      setTitleText("")
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    rotate,
    text,
    opacity,
    zIndex,
    padding,
    font,
    weight,
    titleText,
    radius,
  ])

  useEffect(() => {
    // Assuming you have an asynchronous function to fetch dat
    fetchData() // Call the async function to fetch data when the component mounts
  }, [page, setElements, handleSearch])

  const removebackground = () => {
    const comp = components.find((c) => c.id === current_Components.id)
    const temp = components.filter((c) => c.id !== current_Components.id)
    comp.image = ""
    setImage("")
    setComponents([...temp, comp])
  }
  const addTextFunction = (name, type) => {
    const style = {
      id: components.length + 1,
      name: name,
      type,
      top: 10,
      left: 10,
      opacity: 1,
      border: 2,
      borderColor: "black",
      rotate,
      z_index: components.length + 1,
      color: "rgba(255, 255, 255, 0.0)",
      setText: (a) => setText(a),
      textsize: "70",
      fontStyle: "bold",
      value: ntext,
      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setComponents([...components, style])
  }
  // const HeadingPorps = () => {
  //   onClick = true
  // }

  const createTemplate = (name, type) => {
    const style = {
      id: components.length + 1,
      name: name,
      type,
      top: 0,
      left: 0,
      opacity: 1,
      width: 650,
      height: 450,
      backGroundImage: "http://localhost:5173/hero-img_copy.jpg",
      HeadingPorps: () => addTextFunction("text", "h1"),
      rotate,
      z_index: 1,
      color: "#3c3c3d",
      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setComponents([...components, style])
  }
  const createShape = (name, type) => {
    const style = {
      id: components.length + 1,
      name: name,
      type,
      top: 10,
      left: 10,
      opacity: 1,
      width: 100,
      height: 100,
      rotate,
      z_index: components.length + 1,
      color: "#00ffff",
      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setComponents([...components, style])
  }

  const addTextTitleFunction = (name, type) => {
    const style = {
      id: components.length + 1,
      name: name,
      type,
      top: 10,
      left: 10,
      opacity: 1,
      rotate,
      padding: 5,
      z_index: components.length + 1,
      font: 25,
      weight: 300,
      title: "Add Your Text",
      color: "black",

      setCurrent_Components: (a) => setCurrent_Components(a),
      moveElement,
      resizeElement,
      rotateElement,
      rotateElementFourtyFive,
    }
    setFont("")
    setWeight("")
    setCurrent_Components(style)
    setComponents([...components, style])
  }

  useEffect(() => {
    const get_design = async () => {
      try {
        const { data } = await api.get(`/api/userDesign/${design_id}`)
        const { design } = data
        for (let i = 0; i < design.length; i++) {
          design[i].setCurrent_Components = (a) => setCurrent_Components(a)
          design[i].moveElement = moveElement
          design[i].resizeElement = resizeElement
          design[i].rotateElement = rotateElement
          design[i].rotateElementFourtyFive = rotateElementFourtyFive
          design[i].removebackground = removebackground

          //     setCurrent_Components: (a) => setCurrent_Components(a),
          // moveElement,
          // resizeElement,
          // rotateElement,
        }
        setComponents(design)
      } catch (error) {
        console.log(error)
      }
    }
    get_design()
  }, [design_id])

  return (
    <div className="w-[100%] h-[100%] overflow-hidden">
      {/* Navbar */}
      <Header components={components} design_id={design_id} />

      {/* Main section */}
      <div className="flex h-[93vh] w-screen">
        {/* sideBar */}
        <div className="w-[150px] bg-blue-900 z-50   text-gray-400 flex flex-col gap-4">
          <div
            onClick={() => setElements("design", "design")}
            className={`w-full  hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer z-50 ${
              show.name === "design" ? "bg-[white]" : ""
            }`}
          >
            <span className="text-2xl ">
              <BsGrid1X2 />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>
          <div
            onClick={() => setElements("shape", "shape")}
            className={`w-full  hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer ${
              show.name === "shape" ? "bg-[white]" : ""
            }`}
          >
            <span className="text-4xl ">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>
          <div
            onClick={() => setElements("image", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? "bg-[white]" : ""
            } w-full hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer `}
          >
            <span className="text-4xl ">
              <BsCloudUpload />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div
            onClick={() => setElements("text", "text")}
            className={`${
              show.name === "text" ? "bg-[white]" : ""
            } w-full hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer`}
          >
            <span className="text-4xl ">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>
          <div
            onClick={() => setElements("project", "projects")}
            className={`${
              show.name === "projects" ? "bg-[white]" : ""
            } w-full hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer`}
          >
            <span className="text-4xl ">
              <BsFolder />
            </span>
            <span className="text-xs font-medium">Projects</span>
          </div>
          <div
            onClick={() => setElements("initImage", "images")}
            className={`${
              show.name === "images" ? "bg-[white]" : ""
            } w-full hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer`}
          >
            <span className="text-2xl ">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>
          <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[white]" : ""
            } w-full hover:text-cyan-400 font-semibold flex justify-center items-center flex-col gap-1 h-[10vh] cursor-pointer`}
          >
            <span className="text-4xl text-white">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">BackGround</span>
          </div>
        </div>

        <div className=" w-[calc(100%-150px)] h-[93vh] bg-black ">
          {/* Properties of sideBar conditionaly rendered */}
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : " "
            } bg-white h-[93vh] overflow-auto absolute transition-all rounded-r-lg duration-500 w-[21vw] z-30 mt-0 mb-20`}
          >
            {state === "design" && (
              <div id="templatesDesigns" className="m-3 bg-white">
                <img
                  onClick={() => createTemplate("design", "1")}
                  src="../../../public/Capture1.PNG"
                  alt="Image"
                  className="p-1 cursor-pointer"
                  width={350}
                />
                <img
                  onClick={() => createTemplate("design", "2")}
                  src="../../../public/Capture2.PNG"
                  alt="Image"
                  className="p-1 cursor-pointer"
                  width={350}
                />
                <img
                  onClick={() => createTemplate("design", "3")}
                  src="../../../public/Capture3.PNG"
                  alt="Image"
                  className="p-1 cursor-pointer"
                  width={350}
                />
                <img
                  onClick={() => createTemplate("design", "4")}
                  src="../../../public/Capture4.PNG"
                  alt="Image"
                  className="p-1 cursor-pointer"
                  width={350}
                />
              </div>
            )}

            {state === "shape" && (
              <div className="grid grid-cols-3 mt-3 pl-4 gap-2">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="h-[9vh] cursor-pointer bg-[cyan]"
                ></div>

                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[9vh] cursor-pointer bg-[cyan]"
                ></div>
                <div
                  onClick={() => createShape("shape", "pantagon")}
                  className="relative w-26 h-26 bg-[cyan] cursor-pointer"
                  style={{
                    width: "5vw",
                    height: "10vh",
                    clipPath:
                      "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  }}
                ></div>
                <div
                  onClick={() => createShape("shape", "hexagon")}
                  className="relative w-26 h-26 bg-[cyan] cursor-pointer"
                  style={{
                    width: "5vw",
                    height: "10vh",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                ></div>
                <div
                  onClick={() => createShape("shape", "octagon")}
                  style={{
                    width: "5vw",
                    height: "10vh",
                    clipPath:
                      "polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "rhombus")}
                  style={{
                    width: "5.5vw",
                    height: "10vh",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "semiCircleUpper")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    borderRadius: "50px 50px 0 0",
                    clipPath: "ellipse(100% 100% at 50% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "semiCircleLower")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    borderRadius: "0 0 50px 50px",
                    clipPath: "ellipse(100% 100% at 50% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "diamond")}
                  style={{
                    width: "5.5vw",
                    height: "15vh",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 70%, 0 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "arrow-left")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(0% 50%, 60% 0%, 60% 30%, 100% 30%, 100% 70%, 60% 70%, 60% 100%, 0% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "arrow-up")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%, 50% 0%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "arrow-right")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(100% 50%, 60% 0%, 60% 40%, 0% 40%, 0% 60%, 60% 60%, 60% 100%, 100% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "cross")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)",
                  }}
                  className="cursor-pointer inline-block m-2 bg-[cyan]"
                ></div>
                {/* New Shapes */}
                <div
                  onClick={() => createShape("shape", "ellipse")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    borderRadius: "50%",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "trapezoid")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "parallelogram")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
                    transform: "skew(20deg)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "heart")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    transform: "rotate(45deg)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "star")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "crescent")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 25% 75%, 75% 75%, 75% 25%, 25% 25%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "kite")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "scaleneTriangle")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "scaleneRightTriangle")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath: "polygon(0% 100%, 100% 0%, 0% 0%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
                <div
                  onClick={() => createShape("shape", "concavePentagon")}
                  style={{
                    width: "5.5vw",
                    height: "9.5vh",
                    clipPath:
                      "polygon(50% 0%, 100% 38%, 70% 100%, 50% 60%, 20% 100%, 0% 38%)",
                  }}
                  className="cursor-pointer bg-[cyan] inline-block m-2"
                ></div>
              </div>
            )}

            {state === "image" && (
              <div className="mt-2">
                <ImagesComponents add_item={add_item} />
              </div>
            )}

            {state === "text" && (
              <div className="pl-2 mt-2">
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-cyan-300 hover:bg-cyan-400 w-[20vw] hover:font-bold cursor-pointer rounded-sm text-center text-black text-sm p-3 font-bold">
                    <button
                      onClick={() => addTextTitleFunction("text", "title")}
                    >
                      Add a text
                    </button>
                  </div>
                  <div className="bg-[#3c3c3d] cursor-pointer w-[20vw] rounded-sm text-center text-white text-sm p-3 font-bold">
                    <button onClick={() => addTextFunction("text", "h1")}>
                      Add a Heading
                    </button>
                  </div>
                  {current_Components.name === "text" && (
                    <div className="absolute top-[22vh] right-8  w-[22vw]">
                      <JoditEditor
                        className="absolute top-0 right-0"
                        ref={editor}
                        value={ntext}
                        onChange={(newContect) => setNText(newContect)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {state === "project" && (
              <div className="mt-2">
                <Projects type="main" design_id={design_id} />
              </div>
            )}
            {state === "initImage" && (
              <div className="mt-2 overflow-hidden flex flex-col items-start justify-start pl-4">
                <form onSubmit={handleSearch}>
                  <input
                    className="p-4 mb-4 text-center border-2 overflow-hidden border-black w-[150%] focus:border-transparent focus:border-0 shadow-lg"
                    // ref={imageSearchRef}
                    onChange={(e) => setImageSearchState(e.target.value)}
                    value={imageSearchState}
                    type="text"
                    placeholder="Type something to search...."
                  />
                </form>
                {unSplash.results &&
                  unSplash.results.map((item, index) => (
                    <div
                      onClick={() => add_item(item.urls.small)}
                      key={index}
                      className="border-b-2 overflow-hidden border-black my-2 w-[97%] h-[22vh] cursor-pointer"
                    >
                      {/* Render each item from the fetched data */}
                      <img
                        src={item.urls.small}
                        alt={item.alt_description}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                <div className="p-1 relative bottom-1 left-[30%]">
                  {page > 1 && (
                    <button
                      onClick={() => setPages(page - 1)}
                      className="p-2 text-[1rem] font-bold bg-blue-500 mr-1"
                    >
                      Previous
                    </button>
                  )}
                  {page < totalPages && (
                    <button
                      onClick={() => setPages(page + 1)}
                      className="p-2 text-[1rem] font-bold bg-blue-500"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
            {state === "background" && (
              <div className="mt-2 overflow-hidden flex flex-col items-start justify-start pl-4">
                <form onSubmit={handleSearch}>
                  <input
                    className="p-4 mb-4 text-center border-2 overflow-hidden border-black w-[150%] focus:border-transparent focus:border-0 shadow-lg"
                    // ref={imageSearchRef}
                    onChange={(e) => setImageSearchState(e.target.value)}
                    value={imageSearchState}
                    type="text"
                    placeholder="Type something to search...."
                  />
                </form>
                {unSplash.results &&
                  unSplash.results.map((item, index) => (
                    <div
                      onClick={() => add_background(item.urls.small)}
                      key={index}
                      className="border-b-2 overflow-hidden border-black my-2 w-[97%] h-[22vh] cursor-pointer"
                    >
                      {/* Render each item from the fetched data */}
                      <img
                        src={item.urls.small}
                        alt={item.alt_description}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                <div className="p-1 relative bottom-1 left-[30%]">
                  {page > 1 && (
                    <button
                      onClick={() => setPages(page - 1)}
                      className="p-2 text-[1rem] font-bold bg-blue-500 mr-1"
                    >
                      Previous
                    </button>
                  )}
                  {page < totalPages && (
                    <button
                      onClick={() => setPages(page + 1)}
                      className="p-2 text-[1rem] font-bold bg-blue-500"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>

              // <div className="h-[88vh] mt-2 overflow-x-auto  pl-6">
              //   <BackgroundImages setImage={setImage} type="background" />
              // </div>
            )}
            {show.status === true ? (
              ""
            ) : (
              <div
                onClick={() =>
                  setShow({ name: "", status: true }) && setState("")
                }
                className="flex fixed items-center top-[48vh] left-[27.5vw] justify-center text-4xl text-cyan-800 bg-white h-24 w-12 rounded-full cursor-pointer"
              >
                <FaChevronLeft />
              </div>
            )}
          </div>
          {/* mainFraim For editing */}

          <div className="w-full h-full relative top-0 right-0">
            <div
              className={`flex items-center justify-center relative h-full ${
                !current_Components
                  ? "w-full overflow-hidden"
                  : "w-[calc(100%-200px)] overflow-hidden"
              }`}
            >
              {/* <----------------Main-Design----------------> */}
              <div className="absolute min-h-[450px] min-w-[650px] top-[20%] left-[30%] overflow-hidden">
                <div id="main_design" className="relative overflow-hidden">
                  {components.map((c, i) => (
                    <CreateCom
                      key={i}
                      info={c}
                      currentcomponents={current_Components}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>

                {/* <div className="relative h-[3rem] top-4 left-20 text-white">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="range"
                    id="size"
                    min="500"
                    max="900"
                    value={mainWidth}
                    onChange={handleChangeSizeWidth}
                  />
                  <output>{mainWidth}</output>
                </div> */}
              </div>
            </div>
            {current_Components && (
              <div
                className="h-[93vh] rounded-l-lg w-[260px] text-gray-300 px-3 py-2 absolute top-0
              right-0 bg-white"
              >
                <div
                  onClick={() => setCurrent_Components("")}
                  className="flex absolute  items-center  justify-center top-1 right-6 text-4xl text-white bg-[cyan] h-12 w-14 rounded-full cursor-pointer"
                >
                  X
                </div>
                <div className="flex items-center justify-start gap-4 flex-col h-full px-3 mt-20">
                  <div className="flex items-start justify-start gap-4">
                    <span className="text-xl font-bold text-black">
                      Color:{" "}
                    </span>
                    <label
                      className="h-[30px] w-[30px] cursor-pointer rounded-sm"
                      htmlFor="color"
                      style={{
                        background: `${
                          current_Components.color &&
                          current_Components.color !== "#fff"
                            ? current_Components.color
                            : "gray"
                        }`,
                      }}
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible text-black"
                      id="color"
                    />
                  </div>
                  {current_Components.name === "main_frame" && image && (
                    <div>
                      <button
                        onClick={removebackground}
                        className="py-2 px-4 text-black font-bold bg-slate-300 hover:bg-slate-400 rounded-md"
                      >
                        Remove Background
                      </button>
                    </div>
                  )}
                  {current_Components.name !== "main_frame" && (
                    <div className="flex h-[] flex-col gap-6">
                      <div className="flex items-start justify-start gap-1">
                        <span className="w-[80px] text-xl font-bold text-black">
                          Opacity:{" "}
                        </span>
                        <input
                          type="number"
                          onChange={opacityHandle}
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_Components.opacity}
                          className="w-[80px] border border-gray-700 bg-transparent text-black outline-none px-2 rounded-md"
                        />
                      </div>
                      <div className="flex items-start justify-start gap-1">
                        <span className="w-[80px] text-xl font-bold text-black">
                          z-index:{" "}
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setZIndex(parseInt(e.target.value))}
                          step={1}
                          value={current_Components.z_index}
                          className="w-[80px] border border-gray-700 text-black bg-transparent outline-none px-2 rounded-md"
                        />
                      </div>

                      {current_Components.name === "image" && (
                        <div className="flex items-start justify-start gap-1">
                          <span className="w-[80px] text-xl font-bold text-black">
                            Radius:{" "}
                          </span>
                          <input
                            type="number"
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            step={1}
                            value={current_Components.radius}
                            className="w-[80px] border border-gray-700 text-black bg-transparent outline-none px-2 rounded-md"
                          />
                        </div>
                      )}
                      {current_Components.name === "text" && (
                        <>
                          <div className="flex items-start justify-start gap-1">
                            <span className="w-[80px] text-xl font-bold text-black">
                              padding:{" "}
                            </span>
                            <input
                              type="number"
                              onChange={(e) =>
                                setPadding(parseInt(e.target.value))
                              }
                              step={1}
                              value={current_Components.padding}
                              className="w-[80px] text-black border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <span className="w-[80px] text-xl font-bold text-black">
                              Font Size:{" "}
                            </span>
                            <input
                              type="number"
                              onChange={(e) =>
                                setFont(parseInt(e.target.value))
                              }
                              step={1}
                              value={current_Components.font}
                              className="w-[80px] text-black border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <span className="w-[80px] text-xl font-bold text-black">
                              Weight:{" "}
                            </span>
                            <input
                              type="number"
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              step={100}
                              min={100}
                              max={1000}
                              value={current_Components.weight}
                              className="w-[80px] text-black border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start gap-1">
                            <input
                              type="text"
                              onChange={(e) =>
                                setCurrent_Components({
                                  ...current_Components,
                                  title: e.target.value,
                                })
                              }
                              value={current_Components.title}
                              className="border border-gray-700 bg-white text-black font-bold py-2 outline-none px-2 rounded-md"
                            />
                            <button
                              className="w-[230px] py-1 mt-1 bg-green-800 rounded-sm hover:font-bold"
                              onClick={() =>
                                setTitleText(current_Components.title)
                              }
                            >
                              Add
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MianEdit
