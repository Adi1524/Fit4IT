import { Checkbox } from "antd";
import { Contact, Key, Lock, Mail, UserIcon } from "lucide-react";
import InputFieldIcon from "../globalComponents/InputFieldIcon";

const Signup = () => {
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
            icon={<Contact size={15} className="text-gray-400 mr-2" />}
            placeholder="Your name"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 mt-3">Email</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            icon={<Mail size={15} className="text-gray-400 mr-2" />}
            placeholder="Your email address"
          />
        </div>

        <label className="font-[400] text-xs ml-2 ">Username</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            icon={<UserIcon size={15} className="text-gray-400 mr-2" />}
            placeholder="choose a username"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 ">Set Your password</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            icon={<Key size={15} className="text-gray-400 mr-2" />}
            placeholder="Your name"
            type="password"
          />
        </div>

        <label className="font-[400]  text-xs  ml-2 ">Re-enter</label>
        <div className="mt-1 mb-1">
          <InputFieldIcon
            icon={<Lock size={15} className="text-gray-400 mr-2" />}
            placeholder="Your name"
            type="password"
          />
        </div>

        <div className="mt-4 font-semibold ml-2 ">
          <Checkbox>I accept terms and policy.</Checkbox>
        </div>

        <button className="font-bold w-full text-white bg-[#dfe068] p-2 mt-3 rounded-full">
          Sign up
        </button>

        <p className="text-xs mt-3 text-center ml-3 text-gray-500">
          Already have an account? <span className="font-bold">Log in </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
