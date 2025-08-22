import { Navigate, Outlet } from "react-router-dom";
import { BASE_URL } from "../../utils/constants/constants";

import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/auth/protected", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
        console.log("user not authenticated", error.message);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <h1>Loading....</h1>;
  }
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
