import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { AiOutlineGoogle } from "react-icons/ai"
import api from "../utils/api"
import toast from "react-hot-toast"

function Index() {
  const [shwo, setShow] = useState(false)
  const [type, setType] = useState("")
  const [loader, setLoader] = useState(false)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    question: "",
  })
  const handleFormChane = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const user_register = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await api.post("/api/user-register", state)
      setLoader(false)
      toast.success(data.message)
      localStorage.setItem("Editro_token", data.token)
      setState({
        name: "",
        email: "",
        password: "",
      })
      window.location.href = "/"
    } catch (error) {
      toast.error(error.response.data.message)
      setLoader(false)
      console.log(error.response)
    }
  }
  const user_Forgot = async (e) => {
    e.preventDefault()
    const email = state.email
    const newPassword = state.password
    const question = state.question
    try {
      setLoader(true)
      const { data } = await api.post("/api/user-forgot", {
        email,
        newPassword,
        question,
      })
      setLoader(false)
      setType("signin")
      setShow(true)
      toast.success(data.message)
      setState({
        email: "",
        password: "",
        question: "",
      })
      window.location.href = "/"
    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)
      console.log(error.response)
    }
  }

  const user_login = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await api.post("/api/user-login", state)
      setLoader(false)
      toast.success(data.message)
      localStorage.setItem("Editro_token", data.token)
      setState({
        email: "",
        password: "",
      })
      window.location.href = "/"
    } catch (error) {
      toast.error(error.response.data.message)
      setLoader(false)
      console.log(error.response)
    }
  }
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-sky-900 to-blue-500">
      <div
        className={`w-screen ${
          shwo ? "visible opacity-100" : "invisible opacity-50"
        } transition-all duration-500 h-screen fixed bg-[#252627ad] flex items-center justify-center`}
      >
        <div className="w-[500px] m-auto px-6 py-4 rounded-md relative bg-slate-950">
          <div
            className="absolute right-4 top-4 text-xl cursor-pointer text-white"
            onClick={() => setShow(false)}
          >
            <IoMdClose />
          </div>
          {type === "signin" && (
            <form onSubmit={user_login}>
              <h2 className="text-xl font-bold text-center pb-4 text-cyan-500">
                Login
              </h2>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  id="email"
                  name="email"
                  required
                  onChange={handleFormChane}
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password..."
                  id="password"
                  name="password"
                  onChange={handleFormChane}
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button className="mt-2 px-3 py-2 rounded-lg bg-green-500 w-full outline-none hover:bg-cyan-600 hover:font-bold text-white">
                  Sign In
                </button>
              </div>
              <div className="flex justify-between items-center py-4 px-3">
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
                <div className="text-white">or</div>
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
              </div>
              <div className="pb-4">
                <button
                  onClick={() => {
                    setType("forgotPassword")
                    setShow(true)
                  }}
                  className="flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 w-full outline-none hover:bg-blue-900 text-white"
                >
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Forgot Password</span>
                </button>
              </div>
            </form>
          )}

          {type === "signup" && (
            <form onSubmit={user_register}>
              <h2 className="text-xl font-bold text-center pb-4 text-cyan-500">
                sign Up
              </h2>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="name">Name</label>
                <input
                  required
                  type="name"
                  placeholder="Enter your Name..."
                  id="name"
                  name="name"
                  onChange={handleFormChane}
                  value={state.name}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email..."
                  id="email"
                  name="email"
                  onChange={handleFormChane}
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter your password..."
                  id="password"
                  name="password"
                  onChange={handleFormChane}
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="question">Sports or nickname</label>
                <input
                  required
                  type="question"
                  placeholder="Enter your favorite sports or nickname..."
                  id="question"
                  name="question"
                  onChange={handleFormChane}
                  value={state.question}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="mt-2 px-3 py-2 rounded-lg bg-green-500 w-full outline-none hover:bg-cyan-600 text-white"
                >
                  {loader ? "Loading....." : "Sign Up"}
                </button>
              </div>
              {/* <div className="flex justify-between items-center py-4 px-3">
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
                <div className="text-white">or</div>
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
              </div>
              <div className="pb-4">
                <button className="flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 w-full outline-none hover:bg-blue-900 text-white">
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Sign in with Clerk</span>
                </button>
              </div> */}
            </form>
          )}

          {type === "forgotPassword" && (
            <form onSubmit={user_Forgot}>
              <h2 className="text-xl font-bold text-center pb-4 text-cyan-500">
                Forgot Password
              </h2>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email..."
                  id="email"
                  name="email"
                  onChange={handleFormChane}
                  value={state.email}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="password">New Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter your password..."
                  id="password"
                  name="password"
                  onChange={handleFormChane}
                  value={state.password}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className="flex flex-col mb-3 gap-3 text-white">
                <label htmlFor="question">Sports or nickname</label>
                <input
                  required
                  type="question"
                  placeholder="Enter your favorite sports or nickname..."
                  id="question"
                  name="question"
                  onChange={handleFormChane}
                  value={state.question}
                  className="px-3 py-2 rounded-md border outline-none border-[5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button
                  disabled={loader}
                  className="mt-2 px-3 py-2 rounded-lg bg-green-500 w-full outline-none hover:bg-cyan-600 text-white"
                >
                  {loader ? "Loading....." : "Forgot"}
                </button>
              </div>
              {/* <div className="flex justify-between items-center py-4 px-3">
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
                <div className="text-white">or</div>
                <div className="w-[45%] h-[2px] bg-[#434449]"></div>
              </div>
              <div className="pb-4">
                <button className="flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 w-full outline-none hover:bg-blue-900 text-white">
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Sign in with Clerk</span>
                </button>
              </div> */}
            </form>
          )}
        </div>
      </div>
      <div className="shadow-md ">
        <div className="w-[93%] m-auto">
          {/* Header */}
          <div className="flex justify-between items-center h-28">
            <div className="w-[6rem] h-[3rem] text-center relative">
              <img
                className="absolute inset-0 w-full h-full object-cover cursor-pointer filter grayscale invert"
                src="https://res.cloudinary.com/dbx7qqdys/image/upload/v1707891125/hv1mpfz4xl1tpmtqagpq.svg"
                alt="Editro Logo"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setType("signin")
                  setShow(true)
                }}
                className="font-bold p-2 px-6 shadow-lg text-xl shadow-cyan-500/50 rounded-md bg-cyan-500 hover:bg-white hover:text-black transition-transform ease-in-out duration-100"
              >
                sign In
              </button>
              <button
                onClick={() => {
                  setType("signup")
                  setShow(true)
                }}
                className="font-bold p-2 px-6 shadow-lg text-xl shadow-cyan-500/50 rounded-md bg-cyan-500 hover:bg-white hover:text-black transition-transform ease-in-out duration-100"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 ">
        <div className="py-[33vh]  flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold text-white mb-2">
            Welcome to Editro Free Tool side
          </h1>

          <button
            onClick={() => {
              setType("signup")
              setShow(true)
            }}
            className="text-3xl bg-white font-bold p-2 px-10 rounded hover:rounded-full transition-all duration-200 hover:bg-cyan-500 mt-2"
          >
            Start free
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index
