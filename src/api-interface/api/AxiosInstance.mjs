import axios from "axios";

export const BASE_URL = "http://95.85.119.162:6415/api/";
export const getLocalUrl=()=>{
  return `http://${localStorage.getItem('local_ip')}:6415/api/`;
}
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("my_token")}`,
  },
});

const LocalAxiosInstance = axios.create({
  baseURL: getLocalUrl(),
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("my_token")}`,
  },
});


export const server_ip = "http://95.85.119.162:6415";
export const getLocalServerIp=()=>{
  return `http://${localStorage.getItem('local_ip')}:6415`;
}
export { AxiosInstance };
export { LocalAxiosInstance };
