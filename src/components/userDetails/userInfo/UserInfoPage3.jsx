import { Flex, Radio } from "antd";
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
  validateFirstPage,
  calculateCalories,
}) => {
  console.log("userDetails", userDetails);
  return (
    <div>
      {" "}
      <div className="rounded-3xl shadow-md  p-4  w-[40rem] h-[28rem]">
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
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm mb-2 ">Workout Experience</label>
          <Flex vertical gap="middle">
            <Radio.Group
              block
              value={userDetails.workoutExperience}
              onChange={(e) =>
                handleChange("workoutExperience", e.target.value)
              }
              options={options}
              defaultValue="Pear"
              optionType="button"
            />
          </Flex>
        </div>

        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm ">
            {" "}
            Do you have time to include workout+walking?{" "}
          </label>
          <div className="w-full mt-3 ">
            <Flex vertical gap="middle">
              <Radio.Group
                block
                value={userDetails.walking}
                onChange={(e) => handleChange("walking", e.target.value)}
                options={walkingOption}
                defaultValue="Pear"
                optionType="button"
              />
            </Flex>
          </div>
        </div>

        <button
          type="button"
          onClick={calculateCalories}
          className=" mt-8 w-full bg-[#dfe068]  text-white font-bold rounded-full py-2 "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage3;
