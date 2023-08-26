import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Payload } from "../types/payload";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{
    isChecked: boolean;
    isAuthenticated: boolean;
  }>({ isChecked: false, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedToken = jwtDecode<Payload>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setAuthInfo({ isChecked: true, isAuthenticated: false });
        } else {
          setAuthInfo({ isChecked: true, isAuthenticated: true });
        }
      } else {
        setAuthInfo({ isChecked: true, isAuthenticated: false });
      }
    } catch (error) {
      setAuthInfo({ isChecked: true, isAuthenticated: false });
    }
  }, []);

  return authInfo;
};
