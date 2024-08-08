import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swallet-backend-production.up.railway.app",
});

export default axiosInstance;
