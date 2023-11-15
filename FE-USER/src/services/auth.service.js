import http from "./services";
import { AUTH_TOKEN } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

const authService = {
  signUp(data) {
    return http.post("/api/collections/users/records", data);
  },
  signIn(data) {
    return http.post("/api/collections/users/auth-with-password", data);
  },
  signOut() {
    localStorage.setItem(AUTH_TOKEN, "");
    return Promise.resolve();
  },
  isAuthenticated() {
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwtDecode(authToken);
      return data.exp * 1000 > new Date().getTime();
    }
    return false;
  },
  getUserInfo() {
    let userID = null;
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwtDecode(authToken);
      userID = data.id;
    }
    if (userID) {
      return http.get(`/api/collections/users/records/${userID}`);
    }
    return Promise.reject(null);
  },
};

export default authService;
