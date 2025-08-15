import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedWorkout } from "../../../redux/slice/userWorkoutSlice";

const WorkoutCard = ({ cards = 8, details }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWorkoutCard = (workout) => {
    dispatch(setSelectedWorkout(workout));
    navigate("/workout-detail");
  };
  return (
    <div className="max-w-[400px] mt-2  hide-scrollbar flex overflow-x-auto">
      {details.map((detail, i) => (
        <button
          onClick={() => handleWorkoutCard(detail)}
          className="cursor-pointer "
        >
          <div
            key={i}
            className={`flex mr-2   gap-2  bg-white w-[50rem]  rounded-md p-2`}
          >
            <div className="bg-green-300 w-[9rem] rounded-lg h-[6rem]">
              <img src="" alt="" />
            </div>

            <div className="flex flex-col   w-full justify-between mr-4 ">
              <p className="font-semibold  w-[8rem]"> {detail?.name}</p>
              <div className="w-full ">
                <p className="text-[#192126] w-fit px-1 py-1 rounded-md bg-[#F1F1F1] font-thin text-xs">
                  {detail?.duration}
                  {console.log("what is here ", detail)}
                </p>
                <p className="text-[#192126] mt-1 px-1 py-1 rounded-md bg-[#F1F1F1] w-fit font-thin text-xs">
                  {detail?.category}
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default WorkoutCard;
