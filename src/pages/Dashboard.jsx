import { Progress } from "antd";
import { Hand } from "lucide-react";
import { useEffect, useState } from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import UserProfile from "../components/mainDashboard/userProfile/UserProfile";

const Dashboard = () => {
  const mealPlan = useSelector((store) => store.mealplan.mealplan);
  const userDetails = useSelector((store) => store.userDetails);
  const mealsCompleted = useSelector(
    (store) => store.userDetails.mealsCompleted
  );

  const mealCalories = mealPlan?.totalCalories ? mealPlan?.totalCalories : 0;
  const mealMacros = mealPlan?.totalMacros ? mealPlan?.totalMacros : 0;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [calories, setCalories] = useState(mealCalories);
  const [macros, setMacros] = useState(mealMacros);

  const now = new Date(Date.now());
  const day = now.getDate();
  const dayName = now.toLocaleString("en-US", { weekday: "long" });
  const monthName = now.toLocaleString("en-US", { month: "long" });

  const year = now.getFullYear();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userDetails?.mealsCompleted?.BREAKFAST) {
      setCalories(calories - mealPlan?.breakfast?.calories);
    }
  }, [userDetails?.mealsCompleted]);

  console.log("newplasdlkajs", mealPlan, calories);
  return (
    <div className="h-screen bg-[#ededed] flex ">
      <div className="bg-white w-[70%] h-screen overflow-y-auto hide-scrollbar pr-4 ml-[2px] pt-4 pl-2">
        {/* welcoming green card */}
        <div className="bg-[#dfe068] p-4 rounded-2xl flex gap-6">
          <div>
            <Hand color="white" />
          </div>
          <div>
            <p className="mb-4 text-xl font-bold ">Hello, User!</p>
            <p className=" w-[25rem] text-xs">
              Toady is {dayName}, {monthName} {day} . You have 2 workouts
              planned, your next meal includes idli, you need to drink more
              water to stay hydrated. Keep pushing towards your goals!
            </p>
          </div>
        </div>

        {/* Calories and macronutrients section */}
        <section className="border border-1 rounded-2xl pt-2 pb-1 mt-4 px-4">
          <div className="flex items-center font-thin mb-2 ">
            <p className="w-[40%] font-semibold"> Caloric Intake</p>
            <p className="w-[20%]"> Total</p>
            <p className="w-[20%]">Target</p>
            <p className="w-[20%]">Remaining</p>
          </div>

          <div className="flex  items-center font-thin text-xs ">
            <p className="w-[40%]"> Daily Calories</p>
            <p className="w-[20%] font-semibold"> 1000</p>
            <p className="w-[20%]">{mealPlan?.totalCalories}</p>
            <p className="w-[20%]">300</p>
          </div>
          <Progress percent={50} strokeColor="#dfe068" showInfo={false} />

          <div className="flex items-center font-thin text-xs ">
            <p className="w-[40%]"> carbs</p>
            <p className="w-[20%] font-semibold"> 175</p>
            <p className="w-[20%]">{mealPlan?.totalMacros?.carbs}</p>
            <p className="w-[20%]">85</p>
          </div>
          <Progress percent={50} strokeColor="#dfe068" showInfo={false} />

          <div className="flex items-center font-thin text-xs ">
            <p className="w-[40%]"> Fats</p>
            <p className="w-[20%] font-semibold"> 60</p>
            <p className="w-[20%]">{mealPlan?.totalMacros?.fats}</p>
            <p className="w-[20%]">15</p>
          </div>
          <Progress percent={50} strokeColor="#dfe068" showInfo={false} />

          <div className="flex items-center font-thin text-xs ">
            <p className="w-[40%]"> Protein</p>
            <p className="w-[20%] font-semibold"> 60</p>
            <p className="w-[20%]">{mealPlan?.totalMacros?.protein}</p>
            <p className="w-[20%]">15</p>
          </div>
          <Progress percent={50} strokeColor="#dfe068" showInfo={false} />
        </section>

        {/* Meal plan section */}
        <div className="flex mt-2">
          <div className="w-[80%] border border-1 rounded-2xl mr-2 p-4">
            <p className="font-semibold mb-2">Upcoming Meals</p>
            <div className="h-[200px] overflow-y-auto">
              {mealPlan ? (
                <div className=" bg-white  mx-1  p-3 pt-4 ">
                  {!userDetails?.mealsCompleted?.BREAKFAST && (
                    <div className="border mb-2 bg-primary rounded-2xl">
                      <div className=" px-4 py-4 bg-white rounded-2xl ml-1  ">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-black/90">Breakfast:</p>

                          <div
                            className="rounded-full px-2 text-white text-xs font-bold py-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #c4ca3a, #a8ae2b)",
                            }}
                          >
                            {mealPlan?.breakfast?.calories}cal
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 capitalize font-semibold mt-2">
                          {mealPlan?.breakfast?.name}{" "}
                        </p>
                      </div>
                    </div>
                  )}

                  {!userDetails?.mealsCompleted?.LUNCH && (
                    <div className="border mb-2 bg-primary rounded-2xl">
                      <div className=" px-4 py-4 bg-white rounded-2xl ml-1  ">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-black/90">Lunch:</p>

                          <div
                            className="rounded-full px-2 text-white text-xs font-bold py-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #c4ca3a, #a8ae2b)",
                            }}
                          >
                            {mealPlan?.lunch?.calories}cal
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 capitalize font-semibold mt-2">
                          {mealPlan?.lunch?.name}{" "}
                        </p>
                      </div>
                    </div>
                  )}

                  {!userDetails?.mealsCompleted?.DINNER && (
                    <div className={`border mb-2 bg-primary rounded-2xl`}>
                      <div className=" px-4 py-4 bg-white rounded-2xl ml-1  ">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-black/90">Dinner:</p>

                          <div
                            className="rounded-full px-2 text-white text-xs font-bold py-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #c4ca3a, #a8ae2b)",
                            }}
                          >
                            {mealPlan?.dinner?.calories}cal
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 capitalize font-semibold mt-2">
                          {mealPlan?.dinner?.name}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                  {!userDetails?.mealsCompleted?.SNACKS && (
                    <div className="border mb-2 bg-primary rounded-2xl">
                      <div className=" px-4 py-4 bg-white rounded-2xl ml-1  ">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-black/90">Snacks:</p>

                          <div
                            className="rounded-full px-2 text-white text-xs font-bold py-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #c4ca3a, #a8ae2b)",
                            }}
                          >
                            {mealPlan?.snacks?.calories}cal
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 capitalize font-semibold mt-2">
                          {mealPlan?.snacks?.name}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <h1>meal plan not available</h1>
              )}

              {userDetails?.mealsCompleted?.BREAKFAST &&
                userDetails?.mealsCompleted?.LUNCH &&
                userDetails?.mealsCompleted?.DINNER &&
                userDetails?.mealsCompleted?.SNACKS && (
                  <div className="  text-center font-bold">
                    All Meals Completed!!
                  </div>
                )}
            </div>
          </div>

          {/* daily steps, current mood , calories burnt */}
          <div className="flex-1 space-y-2 w-full">
            <div className="border w-full border-1 py-1 rounded-2xl flex flex-col justify-center items-center">
              <div className="w-6 h-6 rounded-full bg-[#dfe068] flex justify-center items-center ">
                <IoFootstepsOutline color="white" />
              </div>
              <p className="font-thin text-gray-500">Daily Steps</p>
              <p className="font-bold text-md">9,432</p>
            </div>

            {/* <div className="border w-full border-1 py-1 rounded-2xl flex flex-col justify-center items-center">
              <div className="w-6 h-6 rounded-full bg-[#dfe068] flex justify-center items-center ">
                <IoFootstepsOutline color="white" />
              </div>
              <p className="font-thin text-gray-500">Current Mood</p>
              <p className="font-bold text-md">Energetic</p>
            </div> */}

            <div className="border w-full border-1 py-1 rounded-2xl flex flex-col justify-center items-center">
              <div className="w-6 h-6 rounded-full bg-[#dfe068] flex justify-center items-center ">
                <IoFootstepsOutline color="white" />
              </div>
              <p className="font-thin text-gray-500">Calories Burnt</p>
              <p className="font-bold text-md">720 Kcal</p>
            </div>
          </div>
        </div>
      </div>
      <UserProfile />

      {/* <Modal
        open={isModalOpen}
        footer={null}
        closable={false}
        onCancel={handleCancel}
        title={null}
        className="custom-modal"
        centered
        maskClosable={false}
      >
        <p>How is your mooooood Champ!?</p>
      </Modal> */}
    </div>
  );
};

export default Dashboard;
