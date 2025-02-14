import React from "react"

const TemplateDesign = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((d, i) => (
        <div
          key={i}
          className="group w-full overflow-hidden bg-[rgba(255,255,255,0.07)] p-1 cursor-pointer"
        >
          <img
            className="w-[160px] h-[100px] rounded-sm"
            src="http://localhost:5173/public/20190919_221644.jpg"
            alt=""
          />
          {/* <h1 className='bg-black border-[2px] border-white'>Heloo</h1> */}
        </div>
      ))}
    </>
  )
}

export default TemplateDesign
