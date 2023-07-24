import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://ginius-game-api.onrender.com/",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userContact@token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
