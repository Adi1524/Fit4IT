import { Alert } from "antd";
import { Fullscreen } from "lucide-react";
import { useState } from "react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const WorkoutDetailSection = () => {
  const selectedWorkout = useSelector(
    (store) => store.userWorkout.selectedWorkout.workout
  );

  const [youtubeUrl, setYoutubeUrl] = useState(
    selectedWorkout?.details?.exercises[0]?.videoLink
  );
  const navigate = useNavigate();
  const location = useLocation();

  console.log("workoutlink", selectedWorkout?.details?.exercises[0]?.videoLink);
  // const selectedWorkout = {
  //   name: "Low Impact Full Body Starter",
  //   category: "beginner",
  //   duration: "10 minutes",
  //   type: "HIIT Circuit",
  //   details: {
  //     exercises: [
  //       {
  //         name: "March in Place",
  //         duration: "40s",
  //         videoLink: "u1gmWFvEluM",
  //       },
  //       {
  //         name: "Wall Push-ups",
  //         duration: "40s",
  //         videoLink: "YB0egDzsu18",
  //       },
  //       {
  //         name: "Standing Oblique Crunch",
  //         duration: "40s",
  //         videoLink: "yZmq_xSkhI0?si",
  //       },
  //       {
  //         name: "Bodyweight Squats",
  //         duration: "40s",
  //         videoLink: "8uoaYwS6iFM?si",
  //       },
  //       {
  //         name: "Arm Circles Forward & Back",
  //         duration: "40s",
  //         videoLink: "UVMEnIaY8aU?si",
  //       },
  //     ],
  //     restBetweenExercises: "20s",
  //     rounds: 2,
  //   },
  // };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex px-2 my-2 justify-between items-center gap-2">
        {location.pathname === "/workout-detail" && (
          <button type="button" onClick={() => navigate("/dashboard/program")}>
            <FaAngleLeft />
          </button>
        )}

        <p className="font-semibold">{selectedWorkout?.name}</p>

        <button type="button" onClick={() => navigate("/workout-detail")}>
          <Fullscreen size={15} />
        </button>
      </div>
      <div className="h-[23rem] bg-[#dfe068] pt-1 px-8 shrink-0 ">
        <div className="w-full rounded-lg h-full">
          <div className="w-full max-w-xl aspect-video mx-auto my-4">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${youtubeUrl}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-100 pt-4 px-3 ">
          <Alert
            message={`Rest Between Sets: ${selectedWorkout?.details?.restBetweenExercises}`}
            type="info"
            showIcon
          />
        </div>
        <div className="bg-gray-100 pb-4">
          {new Array(selectedWorkout.details.rounds).fill(0).map((_, i) => {
            return (
              <div key={i} className="  px-4 pt-4">
                <p className="font-semibold mb-3">Round {i + 1}</p>

                {selectedWorkout?.details?.exercises.map((workout, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full mt-3 px-4 flex gap-1 items-center bg-white rounded-full h-[4rem]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setYoutubeUrl(`${workout?.videoLink}?autoplay=1`)
                        }
                        className="bg-[#E2F163] w-[3rem] h-[3rem] rounded-full flex items-center justify-center"
                      >
                        <FaPlay size={20} color="white" />
                      </button>

                      <div className="flex-1 flex justify-between items-center   ">
                        <p className="text-xs font-semibold w-[70%] ml-3">
                          {workout?.name}
                        </p>
                        <p className="text-[#896CFE] text-xs font-bold">
                          {workout?.duration}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="px-4 flex justify-end pt-6">
            <button
              type="text"
              className="text-white bg-primary font-bold text-md px-2 py-1 rounded-md "
            >
              Mark as completed!!!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailSection;
