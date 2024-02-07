import axios, { type AxiosInstance } from "axios";
import { getUserFromLocalStorage } from "./helperFunctions";
import { User } from "../features/user/userSlice";

const customAxios: AxiosInstance = axios.create({
  baseURL: "https://ateliergateway.azurewebsites.net/",
});

// const customAxios: AxiosInstance = axios.create();

customAxios.interceptors.request.use(
  (config) => {
    const user: User | null = getUserFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
