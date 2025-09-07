import axios from "axios";

export const apiAbitus = axios.create({
  baseURL: import.meta.env.VITE_ABITUS_API_URL,
});
