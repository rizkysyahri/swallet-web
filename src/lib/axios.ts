import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://swallet-backend-production.up.railway.app",
  baseURL: "http://localhost:4000"
});

export default axiosInstance;
