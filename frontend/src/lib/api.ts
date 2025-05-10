// src/lib/api.ts
import type { AxiosInstance } from "axios"; // Importação do tipo AxiosInstance
import axios from "axios"; // Importação normal do axios

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

export default api;
