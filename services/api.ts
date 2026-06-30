import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7195/api",
});

export default api;
