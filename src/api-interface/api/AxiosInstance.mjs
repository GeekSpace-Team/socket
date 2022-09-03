import axios from "axios";

const onlineChecker=()=>{
  let isOnline=localStorage.getItem('isOnline');
  if(typeof isOnline !== 'undefined' && isOnline != null && isOnline != ''){
    return true;
  } else {
    return isOnline;
  }
}

export const BASE_URL = "http://95.85.119.162:6415/api/";
export const getLocalUrl=()=>{
  let local_ip=localStorage.getItem('local_ip');
  if(typeof local_ip === 'undefined' || local_ip == null || local_ip == ''){
    return `http://localhost:6415/api/`;
  } else {
    return `http://${localStorage.getItem('local_ip')}:6415/api/`;
  }
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
    Authorization: `Bearer ${localStorage.getItem('parallel_token')}`,
  },
});


export const server_ip = "http://95.85.119.162:6415";
export const getLocalServerIp=()=>{
  let local_ip=localStorage.getItem('local_ip');
  if(typeof local_ip === 'undefined' || local_ip == null || local_ip == ''){
    return `http://localhost:6415`;
  } else {
    return `http://${localStorage.getItem('local_ip')}:6415`;
  }
}
export { AxiosInstance };
export { LocalAxiosInstance };
