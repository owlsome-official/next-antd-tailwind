import axios from "axios";

// import AuthService from "apis/auth";
import {
  API_GET_CITIZEN_CARD_INFO,
  EXPIRED_TOKEN_TEXT,
  LANDING_PATH,
  STORAGE_KEY_TOKEN,
  UNPROTECTED_PATHS,
} from "utils/constants";
import { UtilsStorage } from "./storage";

const redirectToAuth = () => {
  console.log("Session is expired, redirect to login");
  const { alert, location } = window;
  alert && alert("เซสชั่นหมดอายุ กำลังพาท่านไปหน้าหลัก");
  location.replace(LANDING_PATH);

  // AuthService.RevokeStorage();

  return Promise.reject(EXPIRED_TOKEN_TEXT);
};
const isUnprotectedPath = (url) => {
  for (let path of UNPROTECTED_PATHS) {
    if (url.includes(path)) {
      return true;
    }
  }
  return false;
};

// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    // ?? Check token is not null then inject before request is sent
    if (isUnprotectedPath(config.url)) {
      return config;
    }
    let token = UtilsStorage.SessionStorage.get(STORAGE_KEY_TOKEN);
    if (token) {
      config.headers["Authorization"] =
        config.headers["Authorization"] || `Bearer ${token}`;
    } else {
      throw Error(EXPIRED_TOKEN_TEXT);
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // ?? Any status code that lie within the range of 2xx cause this function to trigger
    // ?? Do something with response data

    // ?? extend timeout if response has 2xx status
    // UtilsStorage.Cookies.extend(STORAGE_KEY_TOKEN);

    return response;
  },
  (error) => {
    // ?? Any status codes that falls outside the range of 2xx cause this function to trigger
    // ?? Do something with response error
    if (error.request === undefined) {
      return redirectToAuth();
    }

    const { responseURL, status } = error.request;
    if (isUnprotectedPath(responseURL)) {
      return Promise.reject(error);
    }

    if (status === HttpStatusCode.Unauthorized) {
      if (responseURL === API_GET_CITIZEN_CARD_INFO) {
        return Promise.reject(error);
      }
      redirectToAuth();
    }

    return Promise.reject(error);
  }
);

export const HttpStatusCode = axios.HttpStatusCode;
export default axios;

/*
NOTE: another way to using instance as configurable
/ export const instance = axios.create({
/   baseURL: 'https://example.com/api/',
/   timeout: 1000,
/   headers: {'Authorization': 'Bearer '+token}
/ });
*/
