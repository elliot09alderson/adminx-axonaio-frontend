import axios from "axios";

const url =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_URL_DEVELOPMENT
    : import.meta.env.VITE_SERVER_URL_PRODUCTION;
console.log("backend is running on ", url);

export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/admin`;

const api = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
});

const getTokenFromCookies = () => {
  const name = "is_logged_in=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const getToken = () => getTokenFromCookies();

api.interceptors.request.use(
  (request) => {
    const token = getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("Request Headers:", request.headers);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
