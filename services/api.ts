import axios from "axios";

const api = axios.create({
  baseURL: "https://cube-tracker-api-backend.onrender.com",
});

export default api;
