import axios from "axios"
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-2c804/us-central1/api", //API URL after function deploy
})

export default instance
