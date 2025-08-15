import { Flex, Radio } from "antd";
const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const UserInfoPage1 = ({
  handleChange,
  userDetails,
  setPageNo,
  validateFirstPage,
}) => {
  return (
    <div>
      <div className="rounded-3xl shadow-md  p-4  w-[40rem] h-[28rem]">
        <p className="text-lg font-thin text-black">User Information</p>
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm ">Age</label>
          <div className="w-full ">
            <input
              onChange={(e) => handleChange("age", e.target.value)}
              value={userDetails.age}
              type="number"
              min="1"
              max="60"
              step="1"
              className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm ">Height (cm)</label>
          <div className="w-full ">
            <input
              value={userDetails.height}
              onChange={(e) => handleChange("height", e.target.value)}
              type="number"
              className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm ">Weight (kg)</label>
          <div className="w-full ">
            <input
              value={userDetails.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              type="number"
              className="border rounded-2xl mt-2 py-1 w-full px-4 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm mb-2 ">Gender</label>
          <Flex vertical gap="middle">
            <Radio.Group
              block
              value={userDetails.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              options={options}
              defaultValue="Pear"
              optionType="button"
            />
          </Flex>
        </div>

        <button
          type="button"
          onClick={() => {
            if (validateFirstPage()) {
              setPageNo(2);
            }
          }}
          className=" mt-8 w-full bg-[#dfe068] text-white font-bold rounded-full py-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage1;
