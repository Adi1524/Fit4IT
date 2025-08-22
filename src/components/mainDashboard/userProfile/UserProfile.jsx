import { Divider } from "antd";
import { IoIosNotifications } from "react-icons/io";
import { PiFlowerLotus } from "react-icons/pi";
import { useSelector } from "react-redux";

const UserProfile = ({ userDetails }) => {
  const mealPlan = useSelector((store) => store.mealplan.mealplan);

  return (
    <div className="bg-white flex-1 ml-[3px] pl-2 pt-4 pr-4">
      <div className="w-full flex justify-end gap-2">
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-[#dfe068]">
          <IoIosNotifications size={25} color="white" />
        </div>
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-500"></div>
      </div>
      <div className=" bg-[#dfe068]/20 flex flex-col  items-center rounded-2xl mt-2 p-4">
        <div className="h-[6rem] w-[6rem] rounded-2xl items-center justify-center mb-2 flex bg-red-500">
          <p className="text-white font-bold text-4xl">A</p>
        </div>

        <p className="text-xl font-semibold">{userDetails.name}</p>
        <p className="text-xs text-gray-500">
          Age {userDetails?.age}, Fitness Enthusiat
        </p>

        <div className="flex mt-6 gap-4 items-center">
          <div className="border-r text-xs border-gray-300 pr-3">
            <p className="">Height</p>
            <p className="font-bold">{userDetails.height}cm</p>
          </div>

          <div className="border-r text-xs border-gray-300 pr-3">
            <p>Weight</p>
            <p className="text-center font-bold">{userDetails.weight}kg</p>
          </div>

          <div className="text-xs">
            <p>Calories</p>
            <p className="text-center font-bold">{mealPlan?.totalCalories}</p>
          </div>
        </div>
      </div>

      {/* calender date */}

      <Divider />

      <div>
        <p className="text-md font-semibold">Fitness Routine</p>
        <div className="flex items-center gap-2 mt-4 ml-3">
          <div className="w-8 h-8 rounded-full bg-[#dfe068] flex items-center justify-center">
            <PiFlowerLotus color="white" />{" "}
          </div>
          <p className="text-sm">Home workout</p>
        </div>

        <div className="flex items-center gap-2 mt-4 ml-3">
          <div className="w-8 h-8 rounded-full bg-[#dfe068] flex items-center justify-center">
            <PiFlowerLotus color="white" />{" "}
          </div>
          <p className="text-sm">Meal plan </p>
        </div>

        <div className="flex items-center gap-2 mt-4 ml-3">
          <div className="w-8 h-8 rounded-full bg-[#dfe068] flex items-center justify-center">
            <PiFlowerLotus color="white" />{" "}
          </div>
          <p className="text-sm">Guided meditation</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
