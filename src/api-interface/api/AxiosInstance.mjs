import axios from "axios";

export const BASE_URL = "http://10.192.168.26:6415/api/";
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("my_token")}`,
  },
});

const AxiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("my_token")}`,
    "Content-Type": "multipart/form-data",
  },
});

export const server_ip = "http://10.192.168.26:6415";
export { AxiosInstance };
export { AxiosInstanceFormData };
