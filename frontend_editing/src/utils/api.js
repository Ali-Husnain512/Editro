import axios from "axios"

const local_db_api = "http://localhost:3000"
const production_api = ""

const token = localStorage.getItem("Editro_token")

const api = axios.create({
  baseURL: local_db_api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
})

export default api
