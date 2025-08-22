// hooks/useAuthUser.js
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUserDetails } from "../redux/slice/userDetailsSlice";
import { BASE_URL } from "../utils/constants/constants";

const useAuthUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/auth/protected", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.user) {
          dispatch(setUserDetails(res.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
        console.error("User not authenticated:", error.message);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useAuthUser;
