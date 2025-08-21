import { Flex, Radio } from "antd";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";

const options = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
];

const walkingOption = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const UserInfoPage3 = ({
  handleChange,
  userDetails,
  setPageNo,

  handleSubmit,
}) => {
  const [errors, setErrors] = useState({});
  const validateThirdPage = () => {
    const newErrors = {};

    if (!userDetails.workoutExperience) {
      newErrors.workoutExperience = "Please select your workout experience";
    }

    if (userDetails.walking === undefined || userDetails.walking === null) {
      newErrors.walking = "Please choose Yes or No";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div>
      <div className="rounded-3xl shadow-md p-4 w-[40rem] h-[28rem]">
        <p className="text-lg font-thin text-black flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setPageNo(2)}
          >
            <IoChevronBack />
          </button>
          Workout Information
        </p>

        {/* Workout Experience */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm mb-2">Workout Experience</label>
          <Flex vertical gap="middle">
            <Radio.Group
              block
              value={userDetails.workoutExperience}
              onChange={(e) =>
                handleChange("workoutExperience", e.target.value)
              }
              options={options}
              optionType="button"
            />
          </Flex>
          {errors.workoutExperience && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workoutExperience}
            </p>
          )}
        </div>

        {/* Walking Option */}
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm">
            Do you have time to include workout + walking?
          </label>
          <div className="w-full mt-3">
            <Flex vertical gap="middle">
              <Radio.Group
                block
                value={userDetails.walking}
                onChange={(e) => handleChange("walking", e.target.value)}
                options={walkingOption}
                optionType="button"
              />
            </Flex>
          </div>
          {errors.walking && (
            <p className="text-red-500 text-xs mt-1">{errors.walking}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            if (validateThirdPage) {
              handleSubmit();
            }
          }}
          className="mt-8 w-full bg-[#dfe068] text-white font-bold rounded-full py-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage3;
