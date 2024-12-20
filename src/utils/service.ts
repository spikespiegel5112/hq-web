import axios from "axios";

const env = import.meta.env;
console.log("service+++++", env);

const _baseURL: string =
  env.VITE_USER_NODE_ENV === "production" ? env.VITE_BASE_URL : "/api";

console.log(_baseURL);

const service: any = axios.create({
  baseURL: _baseURL,
  // 超时
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    const rejectList = [500, 501];
    // console.log(res);
    if (res.status === 404) {
    }
    if (res.baseURL === "") {
    }

    if (rejectList.some((item: number) => item === res.data.code)) {
      return Promise.reject(res.data);
    }
    // console.log("service.interceptors++++", res);
    const result = res.data;
    return result;
  },
  (error: any) => {
    console.log("service.interceptors error++++", error);
    return Promise.reject(error.response);
  }
);

export default service;

export const baseURL = _baseURL;
