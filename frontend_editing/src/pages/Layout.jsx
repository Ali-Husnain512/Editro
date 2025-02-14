import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { BsFolder, BsGrid1X2 } from "react-icons/bs"
import { token_decode } from "../utils"
import api from "../utils/api"
import toast from "react-hot-toast"

function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const [state, setState] = useState({
    width: 0,
    height: 0,
  })
  const [showabc, setShowabc] = useState(false)

  const userTokenInfo = token_decode(localStorage.getItem("Editro_token"))
  const [user, setUser] = useState([])
  const getUser = async () => {
    try {
      const { data } = await api.get("/api/getUsers")
      setUser(data.users)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
    try {
      console.log("befour click aaaaaaaaaaaaaaaaa")
      localStorage.clear(userTokenInfo)
      toast.success("logout successfully")
      navigate(0)
    } catch (error) {
      toast.error("Cannot Logout something is wrong")
    }
  }

  // const create = (e) => {
  //   e.preventDefault()
  //   navigate("/design/create", {
  //     state: {
  //       type: "create",
  //       width: 650,
  //       height: 450,
  //     },
  //   })
  // }

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const create1 = (e) => {
    e.preventDefault()
    navigate("/design/create", {
      state: {
        type: "create",
        width: state.width || 650,
        height: state.height || 450,
      },
    })
  }

  return (
    <div className=" min-h-screen w-[100vw] overflow-hidden flex flex-col  from-sky-900 to-blue-500 bg-gradient-to-r">
      {/* Header */}
      <div className="flex items-center w-full h-[100px] justify-between pl-[5vw] pr-[1vw]">
        <div className="w-[6rem] h-[3rem] text-center relative">
          <img
            className="absolute inset-0 w-full h-full object-cover cursor-pointer filter grayscale invert"
            src="https://res.cloudinary.com/dbx7qqdys/image/upload/v1707891125/hv1mpfz4xl1tpmtqagpq.svg"
            alt="Editro Logo"
          />
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="pr-8">
            {/* <Link to="/design/:id/edit"> */}
            <button
              className="py-2 px-4 bg-[cyan] text-black rounded-lg overflow-hidden font-medium hover:bg-[white]"
              onClick={create1}
            >
              Create a design
            </button>
            {/* </Link> */}
          </div>
          <div>
            <div className="flex gap-4 items-center justify-center relative">
              <div onClick={() => setShow(!show)} className="cursor-pointer">
                <p className="text-xl font-extrabold text-white hover:text-blue-700 transition-colors duration-300">
                  Active User
                </p>
              </div>

              <div
                className={`absolute z-50 top-0 rounded-lg rounded-tr-none right-0 w-[25rem]  bg-[#313030] p-3 border border-gray-700 transition duration-500 ${
                  show ? "visible opacity-100" : "invisible opacity-30"
                }`}
              >
                <div
                  className="absolute top-5 right-5 cursor-pointer text-white"
                  onClick={() => setShow(false)}
                >
                  X
                </div>
                <div className="flex justify-center p-2 gap-5 items-center">
                  <div className="flex flex-col items-center space-y-4 p-4">
                    {user.map((user) => (
                      <div
                        key={user.email}
                        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
                      >
                        <div className="mb-4">
                          <p className="text-blue-600 text-xl font-bold">
                            Name:{" "}
                            <span className="font-extrabold">{user.name}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-600 text-xl font-bold">
                            Email:{" "}
                            <span className="font-medium">{user.email}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      className="cursor-pointer mt-6 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 active:from-blue-700 active:to-green-700 p-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-black opacity-10" />

      {/*Main Section */}
      <div className="w-full h-auto  flex  ">
        {/* Side bar */}
        <div className=" w-[20vw] p-5 pt-8 ">
          <div className="p-2 flex justify-start items-center gap-5 mb-3 ">
            {user.map((i) => (
              <div
                className="p-2 flex justify-start items-center gap-5 mb-3"
                key={i.email}
              >
                {/*<p className="text-gray-800 font-bold text-5xl bg-[#0edddd] rounded-full h-16 w-16 flex items-center justify-center ">
                  U
                </p>*/}
                <div className="flex  justify-center items-start flex-col">
                  <span className="text-[#0edddd] font-bold text-lg">
                    {i.name}
                  </span>
                  <span className="text-[#0edddd] text-md">{i.email}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <ul className="px-4 flex items-s flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className={`flex justify-start items-center p-2 gap-2 text-[#e0ffff] ${
                    pathname === "/" ? "bg-[#ffffff26]" : ""
                  } rounded-md `}
                >
                  <span className="text-xl">
                    <FaHome />
                  </span>
                  <span className="font-medium text-xl">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`flex justify-start items-center p-2 gap-2 text-[#e0ffff] ${
                    pathname === "/projects" ? "bg-[#ffffff26]" : ""
                  } rounded-md `}
                >
                  <span className="text-xl">
                    <BsFolder />
                  </span>
                  <span className="font-medium text-xl">Projects</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/docs"
                  className={`flex justify-start items-center p-2 gap-2 text-[#e0ffff] ${
                    pathname === "/docs" ? "bg-[#ffffff26]" : ""
                  } rounded-md `}
                >
                  <span className="text-xl">
                    <BsGrid1X2 />
                  </span>
                  <span className="font-medium text-xl">Scan Document</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/docsVerification"
                  className={`flex justify-start items-center p-2 gap-2 text-[#e0ffff] ${
                    pathname === "/docsVerification" ? "bg-[#ffffff26]" : ""
                  } rounded-md `}
                >
                  <span className="text-xl">
                    <BsGrid1X2 />
                  </span>
                  <span className="font-medium text-xl">Document Verify</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1 h-[90vh] mb-8 bg-black opacity-10 " />

        {/* Outlet Section */}
        <div className="w-[80vw] h-full">
          <button
            onClick={() => setShowabc(!showabc)}
            className="p-2 absolute right-8 mt-4 text-[1rem] overflow-hidden text-center rounded-md font-medium bg-[cyan] text-black hover:bg-[#ffffff] "
          >
            Custome design
          </button>
          <form
            onSubmit={create1}
            className={`absolute right-48 gap-3 bg-[#252627] w-[250px] p-4 text-white ${
              showabc ? "visible z-30 opacity-100" : "invisible opacity-30"
            } transition-all duration-500`}
          >
            <div className="grid grid-cols-2 pb-4 gap-2">
              <div className="flex gap-2 items-start justify-center flex-col">
                <label htmlFor="width">width</label>
                <input
                  onChange={inputHandle}
                  required
                  type="number"
                  name="width"
                  className="w-full outline-none p-2 bg-[#1b1a1a] border border-[#4040440] rounded-md"
                  id="width"
                />
              </div>
              <div className="flex gap-2 items-start justify-center flex-col">
                <label htmlFor="height">height</label>
                <input
                  onChange={inputHandle}
                  required
                  type="number"
                  name="height"
                  className="w-full outline-none p-2 bg-[#1b1a1a] border border-[#4040440] rounded-md"
                  id="height"
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 text-[0.9rem] overflow-hidden text-center text-white rounded-md font-medium bg-[#8b3dffad] hover:bg-[#8b3dffd3] w-full"
            >
              Create a new design
            </button>
          </form>
          <div className="pr-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
