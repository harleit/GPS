// src/lib/api.ts
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

// Request interceptor to add the JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("jwtToken"); // Retrieve token from storage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add it to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;