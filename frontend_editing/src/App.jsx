import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Index from "./pages/index"
import Layout from "./pages/Layout"
import Home from "./components/Home"
import Projects from "./components/Projects"
import NewCreateDesign from "./components/NewCreateDesign"
import MianEdit from "./pages/MianEdit"
import { token_decode } from "./utils"
import Degree from "./Degree"
import DegreeVerification from "./DegreeVerification"

const userTokenInfo = token_decode(localStorage.getItem("Editro_token"))

const router = createBrowserRouter([
  {
    path: "/",
    element: userTokenInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/docs",
        element: <Degree />,
      },
      {
        path: "/docsVerification",
        element: <DegreeVerification />,
      },
    ],
  },
  {
    path: "/design/create",
    element: <NewCreateDesign />,
  },
  {
    path: "/design/:design_id/edit",
    element: <MianEdit />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
