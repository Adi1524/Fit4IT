import { Progress } from "antd";
import homeWorkout from "../../../assets/homeWorkout.avif";
import meditationLogo from "../../../assets/meditationLogo.jpeg";
import southIndian from "../../../assets/southIndian.jpeg";
const FitnessSection = ({ setSectionType }) => {
  return (
    <div>
      <p className="text-2xl pr-4  pt-4 pl-2 font-semibold text-black/60 mb-8 ">
        My Fitness Journey
      </p>
      <div className="px-8">
        <button
          type="button"
          onClick={() => setSectionType("meals")}
          className="w-full mb-2  flex shadow-md rounded-2xl "
        >
          <div className="rounded-2xl w-[8rem] h-[8rem] overflow-hidden">
            <img
              src={southIndian}
              alt="South Indian Meals"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 ml-5 my-5 pr-8">
            <div>
              <p className="font-semibold text-md">
                Balanced South Indian Meal Plan to Burn Fat
              </p>

              <div className="mt-5">
                <Progress percent={50} strokeColor="#dfe068" showInfo={false} />
                <p className="text-xs text-gray-500">50% complete</p>
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSectionType("workout")}
          className="w-full mb-2 flex shadow-md rounded-2xl "
        >
          <div className="rounded-2xl w-[8rem] h-[8rem] overflow-hidden">
            <img
              src={homeWorkout}
              alt="Home Workout"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 ml-5 my-5 pr-8">
            <div>
              <p className="font-semibold text-md">
                No-Gym, Easy Home Workout Guide
              </p>

              <div className="mt-5">
                <Progress percent={60} strokeColor="#dfe068" showInfo={false} />
                <p className="text-xs text-gray-500">60% complete</p>
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSectionType("meditation")}
          className="w-full mb-2 flex shadow-md rounded-2xl "
        >
          <div className="rounded-2xl w-[8rem] h-[8rem] overflow-hidden">
            <img
              src={meditationLogo}
              alt="Meditation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 ml-5 my-5 pr-8">
            <div>
              <p className="font-semibold text-md">Meditation</p>

              <div className="mt-5">
                <Progress percent={60} strokeColor="#dfe068" showInfo={false} />
                <p className="text-xs text-gray-500">60% complete</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FitnessSection;
