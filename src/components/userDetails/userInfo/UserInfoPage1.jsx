import { Flex, Radio } from "antd";
import { useState } from "react";

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const UserInfoPage1 = ({ handleChange, userDetails, setPageNo }) => {
  const [errors, setErrors] = useState({});

  const validateFirstPage = () => {
    const newErrors = {};

    if (!userDetails.age) newErrors.age = "Age is required";
    else if (userDetails.age < 1 || userDetails.age > 60)
      newErrors.age = "Age must be between 1 and 60";

    if (!userDetails.height) newErrors.height = "Height is required";
    else if (userDetails.height < 50 || userDetails.height > 220)
      newErrors.height = "Height must be between 50 and 220 cm";

    if (!userDetails.weight) newErrors.weight = "Weight is required";
    else if (userDetails.weight < 10 || userDetails.weight > 200)
      newErrors.weight = "Weight must be between 10 and 200 kg";

    if (!userDetails.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <div className="rounded-3xl shadow-md p-4 w-[40rem] h-[32rem]">
        <p className="text-lg font-thin text-black">User Information</p>

        {/* Age */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm">Age</label>
          <input
            onChange={(e) => {
              let value = e.target.value;
              if (value === "") {
                handleChange("age", "");
                return;
              }
              value = Number(value);
              if (value > 60) value = 60;
              if (value < 1) value = 1;
              handleChange("age", value);
            }}
            value={userDetails.age}
            type="number"
            className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age}</p>
          )}
        </div>

        {/* Height */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm">Height (cm)</label>
          <input
            value={userDetails.height}
            onChange={(e) => {
              let value = e.target.value;
              if (value === "") {
                handleChange("height", "");
                return;
              }
              value = Number(value);
              if (value > 220) value = 220;
              handleChange("height", value);
            }}
            type="number"
            className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">{errors.height}</p>
          )}
        </div>

        {/* Weight */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm">Weight (kg)</label>
          <input
            value={userDetails.weight}
            onChange={(e) => {
              let value = e.target.value;
              if (value === "") {
                handleChange("weight", "");
                return;
              }
              value = Number(value);
              if (value > 200) value = 200;
              handleChange("weight", value);
            }}
            type="number"
            className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm mb-2">Gender</label>
          <Flex vertical gap="middle">
            <Radio.Group
              block
              value={userDetails.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              options={options}
              optionType="button"
            />
          </Flex>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => {
            if (validateFirstPage()) {
              setPageNo(2);
            }
          }}
          className="mt-8 w-full bg-[#dfe068] text-white font-bold rounded-full py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage1;
