import { Key, Mail } from "lucide-react";
import IdliImg from "../../assets/IdliLogo.jpg";

import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../redux/slice/userDetailsSlice";
import { BASE_URL } from "../../utils/constants/constants";
import InputFieldIcon from "../globalComponents/InputFieldIcon";

const Login = () => {
  const userDetails = useSelector((store) => store.userDetails);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleChange = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    const { password, email } = userData;
    const res = await axios.post(
      BASE_URL + "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    if (res.status === 200) {
      dispatch(setUserDetails(res?.data?.user));
      navigate("/dashboard");
    }

    console.log("response: ", res.data.user);
    console.log("userdetails in login", userDetails);
  };

  return (
    <div className="flex">
      <div className="bg-white w-[50%] flex items-center justify-center h-screen">
        <img src={IdliImg} alt="Idli Image" />
      </div>

      <div className="w-[50%] flex items-center justify-center ">
        <div className="">
          <div className="w-full  flex flex-col  items-center ">
            <p className="font-bold text-gray-800 text-4xl">Login </p>
            <p className="font-semibold text-gray-500 text-xs mt-3">
              Join SouthFIt for a healthier you
            </p>
          </div>

          <div className="px-[8rem] mt-4">
            <label className="font-[400]  text-xs  ml-2 mt-3">Email</label>
            <div className="mt-1 mb-1">
              <InputFieldIcon
                value={userData.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                icon={<Mail size={15} className="text-gray-400 mr-2" />}
                placeholder="Your email address"
              />
            </div>

            <label className="font-[400]  text-xs  ml-2 ">Your password</label>
            <div className="mt-1 mb-1">
              <InputFieldIcon
                value={userData.password}
                onChange={(e) => handleChange(e.target.value, "password")}
                icon={<Key size={15} className="text-gray-400 mr-2" />}
                placeholder="enter your password"
                type="password"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="font-bold w-full text-white bg-[#dfe068] p-2 mt-3 rounded-full"
            >
              Login
            </button>

            <p className="text-xs mt-3 text-center ml-3 text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold">
                Sign Up{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
