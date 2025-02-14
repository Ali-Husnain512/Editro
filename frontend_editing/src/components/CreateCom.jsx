import { useEffect, useRef, useState } from "react"
import { BsTrash } from "react-icons/bs"
import Element from "./Element"

const CreateCom = ({ info, currentcomponents, removeComponent }) => {
  const [ntext, setNText] = useState("Heading_1")
  const [HeadingTemp1, setHeadingTemp1] = useState("Enter Heading")
  const [HeadingTemp4, setHeadingTemp4] = useState("HOW TO BECOME A")
  const [HeadingTemp2, setHeadingTemp2] = useState(
    "THE ROAD TO BUSINESS MASTERY"
  )
  const [HeadingTemp3, setHeadingTemp3] = useState("SECRETS")
  const [text1Temp2, setText1Temp2] = useState("salford & Co.")
  const [text1Temp3, setText1Temp3] = useState("YOU")
  const [text2Temp3, setText2Temp3] = useState("Should Know")
  const [text1Temp4, setText1Temp4] = useState("FREELANCER")
  const [text2Temp2, setText2Temp2] = useState(
    "Your Guide to Corporate Success"
  )
  // const [paragraph, setParagraph] = useState(
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id totam in voluptates alias ea qui sapiente voluptatem est distinctio consequuntur."
  // )

  const [imageSrc, setImageSrc] = useState("")

  const handleImageClick = () => {
    document.getElementById("image-upload").click()
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target.result)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const [paragraphTemp1, setParagraphTemp1] = useState(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id totam in voluptates alias ea qui sapiente voluptatem est distinctio consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi in totam, velit numquam, eligendi ratione voluptates soluta officiis pariatur sapiente fuga at repellendus ad minima temporibus quasi cum dolores."
  )
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [paragraphTemp1, imageSrc])
  const randValue = Math.floor(Math.random() * 100)
  // const [template, setTemplate] = useState({
  //   title: "Default Title",
  //   content: "Default Content",
  //   color: "#000000",
  // })

  let html = ""

  if (info.name === "main_frame") {
    html = (
      <div
        // onChange={(e) => info.onchange(e.target.value)}
        id={info.id}
        onClick={() => info.setCurrent_Components(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: `${info.width}px`,
          height: `${info.height}px`,
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img src={info.image} alt="image" className="w-full h-full" />
        )}
      </div>
    )
  }

  // <---------------shapes Start---------------->
  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <Element id={randValue} info={info} exId={randValue} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "pantagon") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "hexagon") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "octagon") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "rhombus") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "semiCircleUpper") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            borderRadius: "50px 50px 0 0",
            clipPath: "ellipse(100% 100% at 50% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "semiCircleLower") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            borderRadius: "0 0 50px 50px",
            clipPath: "ellipse(100% 100% at 50% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "diamond") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 70%, 0 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "arrow-left") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(0% 50%, 60% 0%, 60% 30%, 100% 30%, 100% 70%, 60% 70%, 60% 100%, 0% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "arrow-up") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 100% 60%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 0% 60%, 50% 0%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "arrow-right") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(100% 50%, 60% 0%, 60% 40%, 0% 40%, 0% 60%, 60% 60%, 60% 100%, 100% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "cross") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}t`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  // New shapes

  if (info.name === "shape" && info.type === "ellipse") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}e`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            borderRadius: "50%",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}e`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "trapezoid") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}t`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "parallelogram") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}p`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
            transform: "skew(20deg)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}p`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "heart") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}h`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            transform: "rotate(45deg)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}h`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "star") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}s`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}s`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "crescent") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}c`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 25% 75%, 75% 75%, 75% 25%, 25% 25%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}c`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "kite") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}k`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}k`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "scaleneTriangle") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}st`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}st`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "scaleneRightTriangle") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}srt`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(0% 100%, 100% 0%, 0% 0%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}srt`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "shape" && info.type === "concavePentagon") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          id={`${randValue}cp`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 100% 38%, 70% 100%, 50% 60%, 20% 100%, 0% 38%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}cp`} />
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  // <----------------shapes End----------------->

  if (info.name === "text" && info.type === "title") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          padding: info.padding + "px",
          color: info.color,
          opacity: info.opacity,
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <Element id={randValue} info={info} exId="" />
        <h2
          style={{ fontSize: info.font + "px", fontWeight: info.weight }}
          className="w-full h-full"
        >
          {info.title}
        </h2>
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "text" && info.type === "h1") {
    html = (
      <div>
        <div
          style={{
            left: info.left + "px",
            top: info.top + "px",
            zIndex: info.z_index,
            transform: info.rotate
              ? `rotate(${info.rotate}deg)`
              : "rotate(0deg)",
          }}
          className="absolute group hover:border-[2px] hover:border-indigo-500"
          id={randValue}
          onClick={() => info.setCurrent_Components(info)}
        >
          <textarea
            wrap="hard"
            className="input scrollbar-hide"
            autoFocus={true}
            onChange={(e) => setNText(e.target.value)}
            value={ntext}
            type="text"
            id={`${randValue}h`}
            style={{
              width: `${(ntext.length + 2) * 34}px`,
              height: "100px",
              maxHeight: `400px`,
              background: info.color,
              opacity: info.opacity,
              border: info.border + "px",
              borderColor: info.borderColor,
              fontSize: info.textsize + "px",
              fontWeight: info.fontStyle,
            }}
          />

          {/* <div id={`${randValue}h`}>{HTMLReactParser(info.value)}</div> */}

          <Element id={randValue} info={info} exId={`${randValue}h`} />
          {currentcomponents.id === info.id && (
            <div
              onClick={() => removeComponent(info.id)}
              className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
            >
              <BsTrash className="text-red-900" />
            </div>
          )}
        </div>
      </div>
    )
  }

  if (info.name === "image") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <Element id={randValue} info={info} exId={`${randValue}img`} />
        <div
          className="overflow-hidden"
          id={`${randValue}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "background") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <Element id={randValue} info={info} exId={`${randValue}img`} />
        <div
          className="overflow-hidden"
          id={`${randValue}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "design" && info.type === "1") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          className="flex flex-col justify-start items-center"
          id={`${randValue}tone`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            opacity: info.opacity,
            backgroundImage: `url(${info.backGroundImage})`,
            backgroundColor: "#cccccc",
            backgroundRepeat: "no-repeat",
            backgroundSize: "650px 450px",
            zIndex: "2",
          }}
        >
          <textarea
            onChange={(e) => setHeadingTemp1(e.target.value)}
            value={HeadingTemp1}
            // rows={1}
            // cols={13}
            wrap="hard"
            // onFocus={() => setheading("")}
            className="text-7xl pl-2 text-white font-bold mt-6 scrollbar-hide border-y-4 border-white"
            style={{
              width: `32rem`,
              height: "100px",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
              zIndex: "3",
            }}
          />
          <p>
            {/* <input
              className="text-1xl pl-2 w-auto h-auto bg-transparent text-white border-none"
              type="text"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            /> */}

            <textarea
              ref={textareaRef}
              className="text-1xl pl-2 w-[20vw] h-auto bg-transparent mt-16 text-center scrollbar-hide border-b-2 border-white text-white  resize-none"
              value={paragraphTemp1}
              onChange={(e) => setParagraphTemp1(e.target.value)}
            />
          </p>

          <div className="w-[100px] h-[450px] bg-blue-900 absolute top-0 left-0"></div>
          <div className="w-[100px] h-[450px] bg-blue-900 absolute top-0 right-0"></div>
          <div className="w-[100px] h-[100px] rounded-full absolute top-[-50px] left-[-50px] bg-cyan-400"></div>
          <div className="w-[100px] h-[100px] rounded-full absolute top-[-50px] right-[-50px] bg-cyan-400"></div>
        </div>
        {/* <Element id={randValue} info={info} exId={`${randValue}tone`} /> */}
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  if (info.name === "design" && info.type === "2") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          className="flex flex-col justify-start"
          id={`${randValue}tone`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            opacity: info.opacity,
            backgroundImage: `url(/templatesImages/1.jpg)`, // Background image added here
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Adjust background size as needed
            position: "relative", // Necessary for positioning child elements correctly
          }}
        >
          {/* Content inside the template */}
          <textarea
            onChange={(e) => setText1Temp2(e.target.value)}
            value={text1Temp2}
            className="text-2xl pl-2 text-white font-bold mt-8 ml-14 scrollbar-hide border-white"
            style={{
              width: `26rem`,
              height: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          />
          <textarea
            onChange={(e) => setHeadingTemp2(e.target.value)}
            value={HeadingTemp2}
            // rows={1}
            // cols={13}
            wrap="hard"
            // onFocus={() => setheading("")}
            className="text-5xl ml-6 pl-2 text-white font-bold mt-6 scrollbar-hide border-y-4 border-white"
            style={{
              width: `22rem`,
              height: "10rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
              zIndex: "3",
            }}
          />
          <textarea
            onChange={(e) => setText2Temp2(e.target.value)}
            value={text2Temp2}
            className="text-3xl pl-2 text-red-500 font-bold mt-2 ml-4 scrollbar-hide border-white"
            style={{
              width: `26rem`,
              height: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          />
          {/* <img
            className="absolute bottom-0 right-0"
            width={380}
            height={500}
            src="/templatesImages/temp2Smile.png"
            alt="Smiling face man"
          /> */}
          <div className="absolute bottom-0 right-0 w-[18rem] h-[28rem]">
            <img
              id="displayed-image"
              className="absolute bottom-0 right-0 w-full h-full object-cover cursor-pointer"
              src={imageSrc ? imageSrc : "/templatesImages/temp2Smile.png"}
              alt="Smiling face man"
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* Additional components */}
        {/* <Element id={randValue} info={info} exId={`${randValue}tone`} /> */}
        {/* Option to remove component */}
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "design" && info.type === "3") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          className="flex flex-col justify-start items-end"
          id={`${randValue}tone`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            opacity: info.opacity,
            backgroundImage: `url(/templatesImages/2.jpg)`, // Background image added here
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Adjust background size as needed
            position: "relative", // Necessary for positioning child elements correctly
          }}
        >
          {/* Content inside the template */}
          {/* <textarea
            onChange={(e) => setText(e.target.value)}
            value={text ? text : "salford & Co."}
            className="text-2xl pl-2 text-white font-bold mt-8 ml-14 scrollbar-hide border-white"
            style={{
              width: `26rem`,
              height: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          /> */}
          <textarea
            onChange={(e) => setHeadingTemp3(e.target.value)}
            value={HeadingTemp3}
            // rows={1}
            // cols={13}
            wrap="hard"
            // onFocus={() => setheading("")}
            className="text-7xl pl-2 text-white font-bold mt-10 scrollbar-hide"
            style={{
              width: `22rem`,
              height: "6rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
              zIndex: "3",
            }}
          />
          <textarea
            onChange={(e) => setText1Temp3(e.target.value)}
            value={text1Temp3}
            className="text-5xl pl-2 text-yellow-400 font-bold -rotate-12 ml-8 scrollbar-hide"
            style={{
              width: `15rem`,
              height: "4rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          />
          <textarea
            onChange={(e) => setText2Temp3(e.target.value)}
            value={text2Temp3}
            className="text-5xl text-black font-bold  scrollbar-hide border-b-4 border-white "
            style={{
              width: `22rem`,
              height: "4rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          />
          {/* <img
            className="absolute bottom-0 right-0"
            width={380}
            height={500}
            src="/templatesImages/temp2Smile.png"
            alt="Smiling face man"
          /> */}
          <div className="absolute bottom-0 left-0 w-[18rem] h-[100%]">
            <img
              id="displayed-image"
              className="absolute bottom-0 right-0 w-full h-full object-cover cursor-pointer"
              src={imageSrc ? imageSrc : "/templatesImages/temp3Secret.jpg"}
              alt="Smiling face man"
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* Additional components */}
        {/* <Element id={randValue} info={info} exId={`${randValue}tone`} /> */}
        {/* Option to remove component */}
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }
  if (info.name === "design" && info.type === "4") {
    html = (
      <div
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        id={randValue}
        onClick={() => info.setCurrent_Components(info)}
      >
        <div
          className="flex flex-col justify-start items-end"
          id={`${randValue}tone`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            opacity: info.opacity,
            backgroundImage: `url(/templatesImages/3.jpg)`, // Background image added here
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Adjust background size as needed
            position: "relative", // Necessary for positioning child elements correctly
          }}
        >
          {/* Content inside the template */}
          {/* <textarea
            onChange={(e) => setText(e.target.value)}
            value={text ? text : "salford & Co."}
            className="text-2xl pl-2 text-white font-bold mt-8 ml-14 scrollbar-hide border-white"
            style={{
              width: `26rem`,
              height: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
            }}
          /> */}
          <textarea
            onChange={(e) => setHeadingTemp4(e.target.value)}
            value={HeadingTemp4}
            // rows={1}
            // cols={13}
            wrap="hard"
            // onFocus={() => setheading("")}
            className="text-5xl text-white pl-8 font-bold mt-4 scrollbar-hide"
            style={{
              width: `22rem`,
              height: "6rem",
              backgroundColor: "rgba(255, 255, 255, 0.0)",
              zIndex: "3",
            }}
          />
          <textarea
            onChange={(e) => setText1Temp4(e.target.value)}
            value={text1Temp4}
            className="text-5xl pl-2 text-yellow-400 font-bold scrollbar-hide"
            style={{
              width: `20rem`,
              height: "4rem",
              backgroundColor: "black",
            }}
          />

          {/* <img
            className="absolute bottom-0 right-0"
            width={380}
            height={500}
            src="/templatesImages/temp2Smile.png"
            alt="Smiling face man"
          /> */}
          <div className="absolute bottom-0 left-0 w-[60%] h-[100%]">
            <img
              id="displayed-image"
              className="absolute bottom-0 right-0 w-full h-full object-cover cursor-pointer"
              src={imageSrc ? imageSrc : "/templatesImages/temp4Freelance.png"}
              alt="Smiling face man"
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* Additional components */}
        {/* <Element id={randValue} info={info} exId={`${randValue}tone`} /> */}
        {/* Option to remove component */}
        {currentcomponents.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer"
          >
            <BsTrash className="text-red-900" />
          </div>
        )}
      </div>
    )
  }

  return html
}

export default CreateCom
