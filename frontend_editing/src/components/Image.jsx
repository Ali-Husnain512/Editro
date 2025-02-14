import React from "react"
const Image = ({ add_item, images, setImage, type }) => {
  return (
    <div className="h-[88vh] w-[86%] overflow-x-auto  pl-2">
      <div className="grid grid-cols-2 gap-2 ">
        {images.map((item, i) => (
          <div
            key={i}
            onClick={() =>
              type === "background"
                ? setImage(item.image_url)
                : add_item(item.image_url)
            }
            className="w-full h-[12vh] overflow-hidden rounded-sm cursor-pointer"
          >
            <img
              src={item.image_url}
              className="w-full h-full object-fill"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Image
