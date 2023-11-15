import { useEffect, useState } from "react";
import authService from "../services/Auth.service";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    authService.getUserInfo().then((result) => {
      setUserInfo(result.data);
    });
  }, [isAuthenticated]);

  return userInfo;
}

export default useUserInfo;
