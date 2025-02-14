import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { formatDistanceToNow, parseISO } from "date-fns"

const Designs = ({ design, deleteDesign }) => {
  const formatUpdatedAt = (isoDate) => {
    const date = parseISO(isoDate)
    return formatDistanceToNow(date, { addSuffix: true })
  }
  return (
    <div className="relative flex items-center border-2 border-white justify-center flex-col py-8 px-4 group min-[1200px]:w-72 min-[1200px]:h-56 w-52 h-46 m-auto">
      <Link
        to={`/design/${design._id}/edit`}
        className="w-full h-full bg-[#4ed1d142] block p-3 rounded-md"
      >
        <img
          className="w-full h-full overflow-hidden rounded-md"
          src={design.image_url}
          alt="image"
        />
      </Link>
      <div
        onClick={() => deleteDesign(design._id)}
        className="absolute cursor-pointer top-1 right-1 text-red-500  transition-all duration-500 hidden group-hover:block p-2"
      >
        <FaTrash />
      </div>

      <span className="text-sm  bg-white w-72 text-red-600">
        <span className="text-black">Created At: </span>
        {formatUpdatedAt(design.createdAt)}
      </span>
      <span className="text-sm  bg-white w-72 text-red-600">
        <span className="text-black">Updated At: </span>
        {formatUpdatedAt(design.updatedAt)}
      </span>
    </div>
  )
}

export default Designs
