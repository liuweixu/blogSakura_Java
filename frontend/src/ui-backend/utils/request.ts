import axios from "axios";
import { getToken, removeToken as clearToken } from "./token";

const request = axios.create({
  baseURL: "/",
  timeout: 5000,
});

const navigate = (path: string) => {
  window.location.href = path;
};
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 注入token
    // 获取token
    // 按照后端要求拼接token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      clearToken();
      navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
