import axios from "axios";
import { hideLoading, showLoading } from "@/common/loading";
import { setToken, getToken, setUsername, getUsername } from '@/common/cookie';

const baseURL = "http://localhost:3000";

const instance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
});
/* 拦截所有请求 */
instance.interceptors.request.use(
  (config) => {
    showLoading();
    if (!config.headers["token"]) {
      config.headers["token"] = getToken();
    }
    if (!config.headers["username"]) {
      config.headers["username"] = getUsername();
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);
/* 拦截相应 存储对应的token与username信息 */
instance.interceptors.response.use(
  (config) => {
    const { url } = config.config;
    const { headers, data } = config;
    if (['/admin/login', '/admin/register'].includes(url)) {
      setToken(headers.token);
      setUsername(headers.username);
    }
    hideLoading();
    return data;
  },
  (error) => {
    hideLoading();
    Promise.reject(new Error(error));
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });

}
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
