import { useState } from "react";
import { PiOfficeChair } from "react-icons/pi";
import running from "../../assets/Group 5.svg";
import workoutData from "../../data/hiitWorkout.json";
import stretchesData from "../../data/stretches.json";

import WorkoutCard from "./workoutCard/WorkoutCard";

const WorkoutsSection = () => {
  const [workoutType, setWorkoutType] = useState("HIIT Circuit");
  const [category, setCategory] = useState("beginner");
  const [workoutLocation, setWorkoutLocation] = useState("home");

  const filterWorkout = workoutData?.home.filter(
    (workout) => workout.category === "beginner"
  );

  const filteredStretched = stretchesData.filter(
    (stretch) => stretch.category === "beginner"
  );

  return (
    <div className="bg-[#F1F1F1] min-h-screen px-1">
      <h1 className="text-lg font-semibold  text-[#192126] ">Best for you</h1>

      {filterWorkout.length > 2 ? (
        <>
          <WorkoutCard
            details={filterWorkout.slice(
              0,
              Math.ceil(filterWorkout.length / 2)
            )}
            cards={Math.ceil(filterWorkout.length / 2)}
          />

          <WorkoutCard
            details={filterWorkout.slice(
              filterWorkout.length - Math.floor(filterWorkout.length / 2),
              filterWorkout.length
            )}
            cards={Math.floor(filterWorkout.length / 2)}
          />
        </>
      ) : (
        <WorkoutCard />
      )}

      <section>
        <h1 className="font-semibold mt-4"> Stretches During Work</h1>
        <div className="flex ">
          <div className="relative w-[8rem] h-[7rem] ml-2 rounded-md bg-[#BBF246]">
            <div className="absolute text-sm font-[500]  w-5 bottom-0 mb-3 ml-2">
              Office Workout
            </div>
            <div className="flex  items-end h-full w-full pb-3 pr-2 justify-end">
              <PiOfficeChair color="white" size={70} />
            </div>
          </div>

          <div className="relative w-[8rem] h-[7rem] ml-2 rounded-md bg-[#192126]">
            <div className="absolute text-sm font-[500] text-[#EDEDED]  w-5 bottom-0 mb-3 ml-2">
              Walking Challenge
            </div>
            <div className="flex  items-end h-full w-full pb-3 pr-2 justify-end">
              <img src={running} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1 className="font-semibold mt-4"> Stretches for Relaxation</h1>
        <WorkoutCard details={filteredStretched} />
      </section>
    </div>
  );
};

export default WorkoutsSection;
