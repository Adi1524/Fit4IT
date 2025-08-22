import { Checkbox } from "antd";
import axios from "axios";
import { Contact, Key, Lock, Mail, UserIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants/constants";
import InputFieldIcon from "../globalComponents/InputFieldIcon";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleChange = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  console.log("userdatasas", userData);
  const handleSubmit = async () => {
    if (userData.password !== userData.rePassword) {
      console.log("password not matching");
      return;
    }
    const { username, password, fullName, email } = userData;
    const res = await axios.post(
      BASE_URL + "/auth/register",
      { username, password, name: fullName, email },
      { withCredentials: true }
    );

    if (res.status === 200) {
      navigate("/meal-form");
    }

    console.log("response: ", res);
  };
  return (
    <div className="mt-12">
      <div className="w-full  flex flex-col  items-center ">
        <p className="font-bold text-gray-800 text-4xl">Sign up</p>
        <p className="font-semibold text-gray-500 text-xs mt-3">
          Join SouthFIt for a healthier you
        </p>
      </div>

      <div className="px-[8rem] mt-4">
        <label className="font-[400] text-xs ml-2  ">Full Name</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            value={userData.fullName}
            onChange={(e) => handleChange(e.target.value, "fullName")}
            icon={<Contact size={15} className="text-gray-400 mr-2" />}
            placeholder="Your name"
          />
        </div>

        <label className="font-[400] text-xs ml-2 ">Username</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            value={userData.username}
            onChange={(e) => handleChange(e.target.value, "username")}
            icon={<UserIcon size={15} className="text-gray-400 mr-2" />}
            placeholder="choose a username"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 mt-3">Email</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            value={userData.email}
            onChange={(e) => handleChange(e.target.value, "email")}
            icon={<Mail size={15} className="text-gray-400 mr-2" />}
            placeholder="Your email address"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 ">Set Your password</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            value={userData.password}
            onChange={(e) => handleChange(e.target.value, "password")}
            icon={<Key size={15} className="text-gray-400 mr-2" />}
            placeholder="enter your password"
            type="password"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 ">Re-enter</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            value={userData.rePassword}
            onChange={(e) => handleChange(e.target.value, "rePassword")}
            icon={<Lock size={15} className="text-gray-400 mr-2" />}
            placeholder="re-enter your password"
            type="password"
          />
        </div>

        <div className="mt-4 font-semibold ml-2 ">
          <Checkbox>I accept terms and policy.</Checkbox>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="font-bold w-full text-white bg-[#dfe068] p-2 mt-3 rounded-full"
        >
          Sign up
        </button>

        <Link
          to="/login"
          className="text-xs mt-3 text-center ml-3 text-gray-500"
        >
          Already have an account? <span className="font-bold">Log in </span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
