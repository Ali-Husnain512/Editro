import { FaArrowRotateRight } from "react-icons/fa6"
const Element = ({ id, info, exId }) => {
  return (
    <>
      {exId ? (
        <>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[2px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -top-[2px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[2px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
        </>
      ) : (
        <>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[2px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -top-[2px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[2px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
        </>
      )}
      <div
        // onClick={() => info.rotateElementFourtyFive(id, info)}
        onMouseDown={() => info.rotateElement(id, info)}
        className="hidden absolute group-hover:block text-red-600 -top-[0.8rem] left-[48%] h-[3rem] w-[3rem] cursor-grabbing z-[99999]"
      >
        <FaArrowRotateRight />
      </div>

      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block -top-[2px] left-[45%] translate-[-50%,0%] w-[10px] h-[10px] opacity-5 cursor-nwse-resize bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nwse-resize opacity-5 bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-50%,0%] w-[10px] h-[10px] cursor-nwse-resize opacity-5 bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block bottom-[0.7rem] left-[1.5rem] translate-[-50%,0%] w-[90%] opacity-5 h-[88%] cursor-grab  bg-green-500 z-[99999]"
      ></div>
    </>
  )
}

export default Element
