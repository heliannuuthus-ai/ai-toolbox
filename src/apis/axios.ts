import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";

interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

const clientFactory = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    timeout: 180000,
  });

  // 请求拦截器
  client.interceptors.request.use(
    (config) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data as ErrorResponse);
    },
  );

  // 响应拦截器
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        console.log(error.response);
        switch (error.response.status) {
          case 401:
            // 处理未授权
            break;
          case 403:
            // 处理禁止访问
            break;
          case 404:
            // 处理未找到
            break;
          case 500:
            // 处理服务器错误
            break;
        }
      }
      return Promise.reject(error.response?.data as ErrorResponse);
    },
  );
  return client;
};

export default clientFactory;
