import http from "./services";
import { AUTH_TOKEN } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

const adminService = {
  signUp(data) {
    return http.post("/api/collections/admin/records", data);
  },
  signIn(data) {
    return http.post("/api/collections/admin/auth-with-password", data);
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
    let adminID = null;
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwtDecode(authToken);
      adminID = data.id;
    }
    if (adminID) {
      return http.get(`/api/collections/admin/records/${adminID}`);
    }
    return Promise.reject(null);
  },
};

export default adminService;
